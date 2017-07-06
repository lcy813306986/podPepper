var chart = null;
(function(window){
	var mainEle = $('.main-container');
	$('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacing : [100, 0 , 40, 0]
        },
        title: {
            floating:true,
            text: '总笔数：65笔'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}',
                    // style: {
                    //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    // }
                },
                point: {
                    events: {
                        mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                            // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                            chart.setTitle({
                                text: e.target.name+ '\t'+ e.target.y 
                            });
                        }
                        //, 
                        // click: function(e) { // 同样的可以在点击事件里处理
                        //     chart.setTitle({
                        //         text: e.point.name+ '\t'+ e.point.y + ' %'
                        //     });
                        // }
                    }
                },
            }
        },
        series: [{
            type: 'pie',
            innerSize: '80%',
            name: '占比份额',
            data: [
                {name:'进行的笔数',   y: 31},
                ['通过的笔数',       22],
                {
                    name: '拒绝的笔数',
                    y: 12,
                    sliced: true,
                    selected: true 
                }
            ]
        }]
    }, function(c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y:centerY + titleHeight/2
        });
        chart = c;
    });
	var g1=document.getElementsByClassName("gui1")[0].style;
	var g2=document.getElementsByClassName("gui2")[0].style;
	var g3=document.getElementsByClassName("gui3")[0].style;
	// mainEle.delegate('#cfd3', 'click', function(event) {
	// 	if(g3.display==''||g3.display=='none'){
	// 		g3.display='none';
	// 	}else{
	// 		g3.display='block';
	// 	}
	// });

            mainEle.delegate('#cfd1', 'click', function(event) {
                location.href="../html/index.html";
            });
            mainEle.delegate('#cfd2', 'click', function(event) {
                location.href="../../accredit/html/index.html";
            });
            mainEle.delegate('#cfd3', 'click', function(event) {
                location.href="../../loan/richFarm/html/index.htm";
                g3.display='none';
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
})(window);