(function(window){
	var mainEle = $('.main-container');
	var g1=document.getElementsByClassName("gui1")[0].style;
	var g2=document.getElementsByClassName("gui2")[0].style;
	var g3=document.getElementsByClassName("gui3")[0].style;
	mainEle.delegate('#cfd3', 'click', function(event) {
		if(g3.display==''||g3.display=='none'){
			g3.display='block';
		}else{
			g3.display='none';
		}
	});
})(window);