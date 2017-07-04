;(function(window){
	var document = window.document;
	var mainEle = $('.main-container'),popupReset = $("#resetModal");
	function bindEvent(){
            console.log(name);
		mainEle.delegate('.changeImage div img','click',function(){
			var imgSrc = $(this).attr("src");
			mainEle.find('.bg').attr('src',imgSrc);
		}).delegate('button[data-type="btn-login"]','click',function(){
			userLlogin();
		});

		//键盘事件
		$(document).keypress(function(e){
			if(e.which==13){
				e.preventDefault();
				mainEle.find('button[data-type="btn-login"]').trigger("click");
			}
		});

		//忘记密码
		mainEle.delegate('a[data-toggle="modal"]','click',function(){
			forgetPwd();
		});
	}
	/*
	* 登陆页面做图片切换用
	*/
	function changeImg(){
		var divs = mainEle.find('.changeImage div');
		mainEle.delegate('.changeImage span img','click',function(){
			$this = $(this);
			for(var i = 0; i<divs.length; i++){
				var rand = getRandom(arand);
				$(divs[i]).find('img').attr('src','../../../image/'+rand+'.jpg');
				var arand = rand;
			}
		});
	}


	/*
	*获得不相等的随机数
	*/
	function getRandom(arand) {
		var rand = parseInt(13*Math.random())+1;
		if (rand == arand) {
			return getRandom(arand);
		} else {
			return rand;
		}
	}

	/*
	*数据校验
	*/
	function verifyData(){
		var err='';
		var mobile = $.trim(mainEle.find('input[name="mobile"]').val());
		if(mobile ==''){
        			var text = "手机号码不能为空";
        			window.Simga.msgbox(text, window.Simga.msgbox.typeEnum.warning);
        			return false ;
        		}
        		if(err = Omega.core.checkInputValue('mobile', mobile)){
			window.Simga.msgbox(err, window.Simga.msgbox.typeEnum.warning);
            		return false;
        		}
        		var pwd = $.trim(mainEle.find('input[name="pwd"]').val());
        		if(pwd ==''){
        			var val = "密码不能为空";
        			window.Simga.msgbox(val, window.Simga.msgbox.typeEnum.warning);
        			return false;
        		}
        		if(!pwd){
            		window.Simga.msgbox(err, window.Simga.msgbox.typeEnum.warning);
            		return false;
        		}
        		return true;
    	}

    	/*
    	*用户登陆
    	*/
    	function userLlogin(){
    		var _this = $(this) , err =  '';

   		if(!verifyData()){
   			return false;
   		}

   		var mobile = $.trim(mainEle.find('input[name="mobile"]').val());
    		var pwd = $.trim(mainEle.find('input[name="pwd"]').val());
   		var DATA = {};
   		DATA.mobile = mobile;
   		DATA.pwd = pwd;
   		//发送请求
   		Omega.core.getway.post({
   			cgi : "/user/login",
   			data : DATA,
   			succ : function(json){
   				if(json.code ==0){
   					location.href="../../home/html/index.htm?name="+json.data[0].u_name;
   				}else{
   					window.Simga.msgbox(json.msg, window.Simga.msgbox.typeEnum.warning);
   				}
   			}
   		});
    		
    	}

    	/*
    	*忘记密码
    	*/
    	function forgetPwd(){
    		var err='';
    		window.Simga.msgbox('输入您的电子邮件地址重新设置密码:',window.Simga.msgbox.typeEnum.input);
    		$('.ttBox span').text('忘记密码');
    		$('.popBox').width('570px');
    		$('.popBox').height('300px');
    		$('.txtBox').height('100px');
    		var email = $('.txtBox input').val();
    		var mobile = $('input[name="mobile"]').val();
    		var DATA = {
    			mobile : mobile,
    			email : email
    		};
		$('.btnGroup a').click(function(event) {
			if( err = Omega.core.checkInputValue('mail', email) ){
				alert(err);
	    			return false;
    			}

		});
    		
    		

    	}

	changeImg();
	bindEvent();
})(window);