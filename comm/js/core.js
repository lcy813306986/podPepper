;(function (window){
	'use strict';
	window.Omega = window.Omega || {};
	var document = window.document, navigator = window.navigator, location = window.location, $ = window.$, Omega = window.Omega;

    // $.extend($.validator.messages, {
    //     required: "必填字段",
    //     remote: "请修正该字段",
    //     email: "请输入正确格式的电子邮件",
    //     url: "请输入合法的网址",
    //     date: "请输入合法的日期",
    //     dateISO: "请输入合法的日期 (ISO).",
    //     number: "请输入合法的数字",
    //     digits: "只能输入整数",
    //     creditcard: "请输入合法的信用卡号",
    //     equalTo: "请再次输入相同的值",
    //     accept: "请输入拥有合法后缀名的字符串",
    //     maxlength: $.validator.format("请输入最多{0}个字"),
    //     minlength: $.validator.format("请输入最少{0}个字"),
    //     rangelength: $.validator.format("请输入{0}到{1}个字"),
    //     range: $.validator.format("请输入介于{0}和{1}之间的值"),
    //     max: $.validator.format("请输入最大为{0}的值"),
    //     min: $.validator.format("请输入最小为{0}的值")
    // });
    // $.validator.setDefaults({
    //     errorElement: "em",
    //     errorPlacement: function (error, element) {
    //         // Add the `help-block` class to the error element
    //         error.addClass("help-block");

    //         if (element.prop("type") === "checkbox") {
    //             error.insertAfter(element.parents(".checkbox:first"));
    //         } else if (element.prop("type") === "radio"){
    //             error.insertAfter(element.parents(".radio:first"));
    //         } else {
    //             error.insertAfter(element);
    //         }
    //     },
    //     highlight: function (element, errorClass, validClass) {
    //         var $element = $(element);
    //         if ($element.prop("type") === "checkbox") {
    //             $element.parents(".checkbox:first").parent().addClass("has-error");
    //         } else if ($element.prop("type") === "radio"){
    //             $element.parents(".radio:first").parent().addClass("has-error");
    //         } else {
    //             $element.parent().addClass("has-error");
    //         }
    //     },
    //     unhighlight: function (element, errorClass, validClass) {
    //         var $element = $(element);
    //         if ($element.prop("type") === "checkbox") {
    //             $element.parents(".checkbox:first").parent().removeClass("has-error");
    //         } else if ($element.prop("type") === "radio"){
    //             $element.parents(".radio:first").parent().removeClass("has-error");
    //         } else {
    //             $element.parent().removeClass("has-error");
    //         }
    //     },
    //     submitHandler: function (form) {
    //         //alert("submitted!");
    //         //form.submit();
    //     }
    // });
    // $.validator.addMethod("mobile", function(value, element) {
    //     return this.optional(element) || /^1[3-8]{1}\d{9}$/.test(value);
    // }, "请输入正确的11位手机号码");
    // $.validator.addMethod("idcard", function(value, element) {
    //     return this.optional(element) || /^\d{17}(\d|x|X)$/.test(value);
    // }, "请输入正确的18位身份证号码");
    // $.validator.addMethod("cardno", function(value, element) {
    //     return this.optional(element) || /^\d{9,}$/.test(value);
    // }, "请输入正确的银行卡号");

    // $.extend($.fn.dataTable.defaults, {
    //     scrollY:        "50vh",
    //     scrollX:        true,
    //     scrollCollapse: true,
    //     paging:         false,
    //     fixedHeader:    true,
    //     fixedColumns:   {
    //         leftColumns: 1
    //     },
    //     responsive:     true,
    //     searching:      false,
    //     ordering:       true,
    //     order: [],
    //     columnDefs: [{
    //          targets: [0],    //指定的列
    //          orderable: false //禁用排序
    //     }],
    //     info:           false,
    //     language: {
    //         emptyTable: "没有相关数据"
    //     },
    //     data: []
    // });

    //业务核心类
    Omega.core = Omega.core || {};

	//微信appid
	Omega.core.wechatid = 'wxfdcf384e8f42f847';

    //是否微信访问
    Omega.core.isWechat = /MicroMessenger/i.test(navigator.userAgent);

    //微信授权获取openid
    Omega.core.wechatAuthorize = function(path) {
        var redirect_uri = location.protocol + '//' + location.host + path;
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+Omega.core.wechatid+'&redirect_uri='+window.encodeURIComponent(redirect_uri)+'&response_type=code&scope=snsapi_base&state=detail#wechat_redirect';
    };


     Omega.core.getUrlParam= function(name){
        var reg= new RegExp("(^|&)"+name +"=([^&]*)(&|$)");
        var r= window.location.search.substr(1).match(reg);
        if (r!=null) 
            return unescape(r[2]); 
        return null;
        }
    //格式校验
    Omega.core.checkInputValue = function(name, val) {
        var err = '';
        switch(name){
            case 'mobile':
                if(!/^1[3-8]{1}\d{9}$/.test(val)){
                    err = '请输入正确的手机号码';
                }
                break;
            case 'phone':
                if(!/((^((\+?86)|(\(\+86\)))?1[3-8]{1}\d{9}$)|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(val)){
                    err = '请输入正确的电话号码';
                }
                break;
            case 'number':
                if(!/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val)){
                    err = '请输入合法的数字';
                }
                break;
            case 'date':
                if(/Invalid|NaN/.test(new Date(val).toString())){
                    err = '请输入合法的日期';
                }
                break;
            case 'dateISO':
                if(!/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(val)){
                    err = '请输入合法的日期';
                }
                break;
            case 'imgCode':
                if(!/^\w{5,6}$/.test(val)){
                    err = '请输入正确的图形验证码';
                }
                break;
            case 'smsCode':
                if(!/^\w{6}$/.test(val)){
                    err = '请输入正确的手机验证码';
                }
                break;
            case 'password':
                if(!/^\S{6,16}$/.test(val)){
                    err = '请输入6~16位非空白字符的密码';
                }
                break;
            case 'name':
                if(!/^(\S|\s){2,}$/.test(val)){
                    err = '请输入至少2个字的姓名';
                }
                break;
            case 'nickName':
                if(!/^(\S|\s){2,}$/.test(val)){
                    err = '请输入至少2个字的昵称';
                }
                break;
            case 'mail':
                if(!/^\S+@\w+\.\w+$/.test(val)){
                    err = '请输入正确的邮箱地址';
                }
                break;
            case 'address':
                if(!/^(\S|\s){2,}$/.test(val)){
                    err = '请输入至少2个字的详细地址';
                }
                break;
            case 'idcard':
                if(!/^\d{17}(\d|x|X)$/.test(val)){
                    err = '请输入18位身份证号码';
                }
                break;
            case 'cardno':
                /*if(!/^\d{9,}$/.test(val)){
                    err = '请输入至少9位银行卡卡号';
                }*/
                if(!val.length){
                    err = '卡号不能为空';
                }else{
                    var addNum = 0,
                        arr = [0,2,4,6,8,1,3,5,7,9],
                        count = 0,
                        num;
                    for(var i=val.length-1; i>=0; i--){
                        num = parseInt(val.charAt(i));
                        count ++;
                        if(count%2 === 0){
                            num = arr[num];
                        }
                        addNum += num;
                    }
                    if(addNum%10!==0 || addNum===0){
                        err = '您的银行卡号可能填错了';
                    }
                }
                break;
        }
        return err;
    };

    //短信验证码倒计时
    Omega.core.smsCodeTimer = function(_this) {
        var count = parseInt((_this.text().match(/^\d+/) || [])[0] || 61, 10);
        if(count < 1){
            _this.removeClass('disabled').text('获取验证码');
            return;
        }
        if(!_this.hasClass('disabled')){
            _this.addClass('disabled');
        }
        _this.text((count-1) + '秒重新获取');
        window.setTimeout(function(){
            Omega.core.smsCodeTimer(_this);
        }, 1000);
    };

    //数据保存校验
    Omega.core.verifyData = function($dom) {
        var DATA = {}, count = 0;
        $dom.find('input[type="hidden"],input[type="text"],select').each(function(){
            var $this = $(this), err = '';
            if($this.attr('required')){
                if(!$this.val()){
                    count ++;
                    $this.parent().addClass('has-error');
                }else{
                    if($this.attr("data-rule-required")){
                        err = Omega.core.checkInputValue($this.attr("data-rule-required"), $this.val());
                        if(err){
                            count ++;
                            $this.parent().addClass('has-error');
                            Omega.core.msgbox.alert(err);
                            return false;
                        }else{
                            $this.parent().removeClass('has-error');
                        }
                    }else{
                        $this.parent().removeClass('has-error');
                    }
                }
            }else{
                if($this.val() && $this.attr("data-rule-required")){
                    err = Omega.core.checkInputValue($this.attr("data-rule-required"), $this.val());
                    if(err){
                        count ++;
                        $this.parent().addClass('has-error');
                        Omega.core.msgbox.alert(err);
                        return false;
                    }else{
                        $this.parent().removeClass('has-error');
                    }
                }else{
                    $this.parent().removeClass('has-error');
                }
            }
            if($this.attr('name')){
                DATA[$this.attr('name')] = $this.val();
            }
        });
        return !count ? DATA : false;
    };

    // template.helper("encodeURIComponent", function(str){
    //     return window.encodeURIComponent(str);
    // });

    // template.helper("objectRoute", Omega.util.object.route);
    // template.helper("accMul", Omega.util.acc.mul);
    // template.helper("accSub", Omega.util.acc.sub);
    // template.helper("toThousands", Omega.util.toThousands);
    // template.helper("getStrLength", Omega.util.getStrLength);
    // template.helper("formatDate", Omega.util.formatDate);
    // template.helper("Arabia2Chinese", Omega.util.Arabia2Chinese);

    // template.helper("isWechat", Omega.core.isWechat);
    // template.helper("wechatAuthorize", Omega.core.wechatAuthorize);

    // template.helper("min", Math.min);

})(window);