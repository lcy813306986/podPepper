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

            mainEle.delegate('#cfd1', 'click', function(event) {
                location.href="../../../home/html/index.html";
            });
            mainEle.delegate('#cfd2', 'click', function(event) {
                location.href="../../../accredit/html/index.html";
            });
            mainEle.delegate('#cfd3', 'click', function(event) {
                location.href="../../richFarm/html/index.htm";
                g3.display='none';
            });
             mainEle.delegate('.richFarm', 'click', function(event) {
                location.href="../../richFarm/html/index.htm";
            });
            mainEle.delegate('.repay', 'click', function(event) {
                location.href="../html/index.html";
            });
            mainEle.delegate('.reposit', 'click', function(event) {
                location.href="../../deposit/html/index.html";
            });
})(window);