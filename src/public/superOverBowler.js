(function chart() {
    fetch('./output/superOverBowler.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const data = objectToArray(records);
            barChart(data);
        })
        .catch(err => {
            console.error(err);
        })


    function barChart(records) {
        Highcharts.chart('superOverBowler', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Number of times one player has been dismissed by another player'
            },
            subtitle: {
                text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">kaggle</a>'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -90,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of time dismissed'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
            },
            series: [{
                name: 'Population',
                data: records,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    }
    function objectToArray(records) {

        const formatData = [];
        for (let player in records) {
            formatData.push([records[player].player, records[player].runs])
        }
        return formatData;
    }
})();


function objectToArray(records) {

    const formatData = [];
    for (let player in records) {
        formatData.push([records[player].player, records[player].runs])
    }
    return formatData;
}


function barChart(records) {
    Highcharts.chart('superOverBowler', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Number of times one player has been dismissed by another player'
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">kaggle</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -90,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of time dismissed'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
        },
        series: [{
            name: 'Population',
            data: records,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}
