(function(window){
	var mainEle = $('.main-container');
	var g1=document.getElementsByClassName("gui1")[0].style;
	var g2=document.getElementsByClassName("gui2")[0].style;
	var g3=document.getElementsByClassName("gui3")[0].style;
	// mainEle.delegate('#cfd3', 'click', function(event) {
	// 	if(g3.display==''||g3.display=='none'){
	// 		g3.display='block';
	// 	}else{
	// 		g3.display='none';
	// 	}
	// });

            mainEle.delegate('#cfd1', 'click', function(event) {
                location.href="../../home/html/index.html";
            });
            mainEle.delegate('#cfd2', 'click', function(event) {
                location.href="../html/index.html";
            });
            mainEle.delegate('#cfd3', 'click', function(event) {
                location.href="../../loan/richFarm/html/index.htm";
            });
             mainEle.delegate('.richFarm', 'click', function(event) {
                location.href="../../loan/richFarm/html/index.htm";
            });
            mainEle.delegate('.repay', 'click', function(event) {
                location.href="../../loan/repay/html/index.html";
            });
            mainEle.delegate('.reposit', 'click', function(event) {
                location.href="../../loan/deposit/html/index.html";
            });

    var modal=document.getElementById('modal');
    var question=document.getElementById('question');
    if (typeof document.addEventListener != "undefined"){
        modal.addEventListener('click',function(){
            modal.style.display='none';
        });

        question.addEventListener('click',function(){
            modal.style.display='block';
        });
    }else{
        modal.attachEvent('onclick',function(){
            modal.style.display='none';
        });

        question.attachEvent('onclick',function(){
           modal.style.display='block';
        });
    }



})(window);