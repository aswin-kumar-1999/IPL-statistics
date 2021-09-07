(function chart() {
    fetch('./output/economicalBowler.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const economicBowler = objectToArray(records);
            pieChart(economicBowler);
        })
        .catch(err => {
            console.error(err);
        })
    function objectToArray(records) {
        const data = [];
        for (let bowl of records) {
            data.push({ name: bowl.bowler, y: bowl.avgRun });
        }
        return data;
    }


    function pieChart(economicBowler) {
        console.log(economicBowler);
        Highcharts.chart('economicalBowler', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Top 10 economical bowlers in the year 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'bowling rate',
                colorByPoint: true,
                data: economicBowler
            }]
        });
    }

})();

function objectToArray(records) {
    const data = [];
    for (let bowl of records) {
        data.push({ name: bowl.bowler, y: bowl.avgRun });
    }
    return data;
}


function pieChart(economicBowler) {
    console.log(economicBowler);
    Highcharts.chart('economicalBowler', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Top 10 economical bowlers in the year 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'bowling rate',
            colorByPoint: true,
            data: economicBowler
        }]
    });
}
