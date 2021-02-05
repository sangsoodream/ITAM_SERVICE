/*pie_chart01*/
$(document).ready(function(){
"use strict";
Highcharts.chart('pie_chart01', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    colors: ['#4BC0C0', '#3AACFB', '#7A70EE', '#4D6BDC', '#FF9F40', '#FFCD56', '#BFC8E0', '#808CA4'],
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{name.series}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: '하드웨어 자산현황',
      colorByPoint: true,
      data: [{
        name: '노트북',
        y: nbCnt,
        sliced: true,
        selected: true
      }, {
        name: '데스크톱',
        y: 12
      }, {
        name: '모니터',
        y: 18
      }, {
        name: '서버',
        y: 3
      }, {
        name: '네트웍장비',
        y: 1
      }, {
        name: '모바일기기',
        y: 3
      }, {
        name: '사무기기',
        y: 3 
      }, {
        name: '기타장비',
        y: 3   
      }]
    }]
  });
});

/*pie_chart01*/
$(document).ready(function(){
    "use strict";
    Highcharts.chart('pie_chart02', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        colors: ['#4D6BDC', '#3C54AB', '#7886B9', '#A1B4F7', '#2A3B78', '#D3E3FE'],
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{name.series}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: '소프트웨어 자산현황',
          colorByPoint: true,
          data: [{
            name: '개발용 IDE',
            y: 4,
            sliced: true,
            selected: true
          }, {
            name: '시스템관리',
            y: 5
          }, {  
            name: '디자인 SW',
            y: 4
          }, {
            name: '문서편집',
            y: 6
          }, {
            name: '데이터베이스',
            y: 1
          }, {
            name: '기타',
            y: 2
          }]
        }]
      });
    });

/*bar_chart01*/
$(document).ready(function(){
    "use strict";
    Highcharts.chart('bar_chart01', {
        chart: {
          type: 'column'
        },
        colors: ['#D9DCDE', '#A1A8AC', '#687479', '#425158'],
        title: {
          text: ''
        },
        xAxis: {
          categories: ['노트북', '데스크톱', '모니터', '서버', '네트웍장비', '모바일기기', '사무기기', '기타장비']
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
          column: {
            stacking: 'percent'
          }
        },
        series: [{
          name: '구매지급',
          data: [5, 3, 4, 7, 2, 5, 3, 4 ]
        }, {
          name: '구매미지급',
          data: [2, 2, 3, 2, 1, 2, 2, 3]
        }, {
          name: '렌탈지급',
          data: [3, 4, 4, 2, 5, 3, 4, 4]
        }, {
          name: '렌탈미지급',
          data: [3, 4, 4, 2, 5, 3, 4, 4]    
        }]
      });
});

/*bar_chart02*/
$(document).ready(function(){
    "use strict";
    Highcharts.chart('bar_chart02', {
        chart: {
          type: 'column'
        },
        colors: ['#4D6BDC'],
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{point.y:1f}'
        },
        series: [{
          name: '소프트웨어 자산현황',
          data: [
            ['개발용 IDE', 4],
            ['시스템관리', 5],
            ['디자인 SW', 4],
            ['문서편집', 6],
            ['데이터베이스', 1],
            ['기타', 2]           
          ],
        }]
      });
});

