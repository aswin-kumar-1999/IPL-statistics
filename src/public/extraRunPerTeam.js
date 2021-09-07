(function chart() {
    fetch('./output/extraRunPerTeam.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const extraScorePerTeam = objectToArray(records);
            barChart(extraScorePerTeam);
        })
        .catch(err => {
            console.error(err);
        })
    function objectToArray(records) {
        const team = Object.keys(records);
        const extraScore = Object.values(records);
        const graphFormat = [];
        for (let i = 0; i < team.length; i++) {
            graphFormat.push([team[i], extraScore[i]]);
        }
        return graphFormat;
    }

    function barChart(extraScorePerTeam) {
        Highcharts.chart('extraRunPerTeam', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Extra runs conceded per team in the year 2016'
            },
            subtitle: {
                text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">kaggle</a>'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Extra runs'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Extra score in 2016: <b>{point.y:.1f} runs</b>'
            },
            series: [{
                name: 'Extra runs',
                data: extraScorePerTeam,
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

})();

function objectToArray(records) {
    const team = Object.keys(records);
    const extraScore = Object.values(records);
    const graphFormat = [];
    for (let i = 0; i < team.length; i++) {
        graphFormat.push([team[i], extraScore[i]]);
    }
    return graphFormat;
}

function barChart(extraScorePerTeam) {
    Highcharts.chart('extraRunPerTeam', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Extra runs conceded per team in the year 2016'
        },
        subtitle: {
            text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Extra runs'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Extra score in 2016: <b>{point.y:.1f} runs</b>'
        },
        series: [{
            name: 'Extra runs',
            data: extraScorePerTeam,
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
