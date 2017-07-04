/**
 * 数据交互公共处理模块
 */
;(function (window){
	'use strict';
	window.Omega = window.Omega || {};
    var document = window.document, navigator = window.navigator, location = window.location, $ = window.$, Omega = window.Omega;

	//业务核心类
	Omega.core = Omega.core || {};
    
    Omega.core.getway = {

        lock : {},
        /**
         * 异步请求
         * 
         * @param {String} url 参数名 请求的url地址
         * @param {String} cgi 参数名 请求的cgi路径
         * @param {Object} data 参数名 提交的数据
         * @param {String} type 参数名 GET|POST
         * @param {Function} succ 参数名 成功的回调方法
         * @param {Function} err 参数名 失败的回调方法
         */
        xhr : function(params) {
            var options = $.extend(true, {}, {
                url : "",
                cgi : "",
                data : {"_ukey": Omega.util.getToken('userCode'), "r": Math.random()},
                type : "GET",
                succ : null,
                err : null
            }, params);
            if(!options.url && !options.cgi){
                console.log(options);
                Omega.core.msgbox.alert("缺少参数");
                return false;
            }
            //post请求防连续提交
            var that = this, key = $.trim(options.cgi || options.url).match(/^(\S*?)(\?[\s\S]*)?$/);
            key = key && key[1];
            if(options.type.toLowerCase()!="get" && !options._unlock && !options.data._unlock && key && that.lock[key]){
                return false;
            }
            key && (that.lock[key] = true);
            console.log(key + " === "), console.log(options.data);
            //发请求
            var t0 = new Date();
            var args = {
                url : (options.url || that.config.api()) + options.cgi,
                type : options.type.toUpperCase(),
                dataType : "json",
                //xhrFields : {withCredentials: true},
                //crossDomain : true,
                data : options.contentType&&options.contentType.indexOf('json')!=-1 ? window.JSON.stringify(options.data):options.data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                },
                success : function(json){
                    if(json){
                        //返回码统计
                        options.cgi && Omega.util.stat.code(options.cgi, json.status=='0'?1:3, json.status, new Date()-t0);
                        var gologin = false, locpath = location.pathname.match(/\/(_[\w_-]*)\/([\w_-]*)/) || [];
                        if(json.status == 'SE001'){
                            gologin = true;
                        }
                        if(!gologin){
                            options.succ && options.succ(json);
                            window.setTimeout(function(){
                                key && (that.lock[key] = false);
                            }, 500);
                        }else{
                            location.href = that.config.api() + '?returnUrl=' + window.encodeURIComponent(location.href);
                        }
                    }else{
                        options.cgi && Omega.util.stat.code(options.cgi, 2, 0, new Date()-t0);
                        options.err && options.err();
                        key && (that.lock[key] = false);
                    }
                },
                error : function(xhrequest){//{"readyState":0,"responseText":"","status":0,"statusText":"error"}
                    options.cgi && Omega.util.stat.code(options.cgi, 2, -400, new Date()-t0);
                    options.err && options.err(xhrequest);
                    key && (that.lock[key] = false);
                },
                statusCode: {
                    401: function(){
                        Omega.core.msgbox.toast("服务器超时...重新登录", function(){
                            location.href = that.config.api() + '/sign/login.htm?returnUrl=' + window.encodeURIComponent(location.href);
                        });
                    },
                    403: function(){
                        window.Simga.msgbox('没有操作权限', window.Simga.msgbox.typeEnum.warning);
                    },
                    404: function(){
                        window.Simga.msgbox('没有找到接口', window.Simga.msgbox.typeEnum.warning);
                    },
                    500: function(){
                        window.Simga.msgbox('服务器错误', window.Simga.msgbox.typeEnum.warning);
                    }
                }
            };
            typeof(options.cache)!='undefined' && (args.cache = options.cache);
            typeof(options.processData)!='undefined' && (args.processData = options.processData);
            typeof(options.contentType)!='undefined' && (args.contentType = options.contentType);
            typeof(options.dataType)!='undefined' && (args.dataType = options.dataType);
            $.ajax(args);
        },
        post : function(params) {
            this.xhr($.extend({}, params, {type : "POST"}));
        },
        get : function(params) {
            this.xhr(params);
        },
        /**
         * 上传附件sdk
         * 
         * @param {String} url 参数名 请求的url地址,选填
         * @param {String} filelem 参数名 文件选择框id，必填
         * @param {Object} data 参数名 提交的数据， 选填
         * @param {Function} succ 参数名 成功的回调方法，选填
         * @param {Function} err 参数名 失败的回调方法，选填
         */
        uploader : function(params) {
            var options = $.extend(true, {}, {
                //runtimes: 'html5,flash,silverlight,html4',    //上传模式,依次退化
                runtimes: 'html5,flash',
                browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
                url: Omega.core.getway.config.api() + '/cust/attach/res/uploadAttach',
                file_data_name: 'resFile',
                filters : {
                    // Maximum file size
                    max_file_size : '100mb'//,
                    // Specify what files to browse for
                    /*mime_types: [
                        {title : 'Image files', extensions : 'jpg,jpeg,gif,png'},
                        {title : 'Zip files', extensions : 'zip'}
                    ]*/
                },
                flash_swf_url : '../../moxie/plupload.swf',  //引入flash,相对路径
                //silverlight_xap_url : '../../moxie/plupload.xap',
                max_retries: 3,                     //上传失败最大重试次数
                //chunk_size: '1mb',                  //分块上传时，每片的体积
                multi_selection: true,
                auto_start: false,                   //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    FilesAdded: function(up, files) {
                        up.start();
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                            //console.log(file.name);
                        });
                    },
                    BeforeUpload: function(up, file) {
                        // 每个文件上传前,处理相关的事情
                        
                    },
                    UploadProgress: function(up, file) {
                        // 每个文件上传时,处理相关的事情
                        console.log(file.percent);
                    },
                    FileUploaded: function(up, file, info) {
                        // 每个文件上传成功后,处理相关的事情
                        console.log('uploaded');
                        var res = window.JSON.parse(info.response);
                        
                    },
                    UploadComplete: function(up) {
                        // 队列文件处理完毕后,处理相关的事情
                        console.log('completed');
                    },
                    Error: function(up, err) {
                        // 上传出错时,处理相关的事情
                        Omega.core.msgbox.alert(err.message);
                    }
                }
            }, params);

            return new plupload.Uploader(options);
        }
    };

    Omega.core.getway.config = function(){
        return {
            debug : false,
            api : function(){
                var loc = location.protocol+'//'+location.host;
                if(this.debug && (/^http:\/\/localhost/.test(loc)) || /^http:\/\/10.1.10.35/.test(loc)){
                    loc += '/debug';
                }
                return loc;
            }
        };
    }();

})(window);