(function matchesplayed() {
    let season;
    let matchesPlayer;
    fetch('./output/matchesPerYear.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const season = Object.keys(records);
            const matchesPlayer = Object.values(records);
            barChart(season, matchesPlayer);
        })
        .catch(err => {
            console.error(err);
        })
    function barChart(season, matchesPlayer) {
        Highcharts.theme = {
            colors: ['#10ad61'],
        };
        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
        Highcharts.setOptions({
            chart: {
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, '#d9aefc'],
                        [1, 'rgb(240, 240, 255)']
                    ]
                },
                borderWidth: 5,
                plotBackgroundColor: '#e3fae9',
                plotShadow: true,
                plotBorderWidth: 1
            }
        });

        Highcharts.chart('matchesPerYear', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Number of matches played in IPL from 2008-2017'
            },
            subtitle: {
                text: 'Source: https://www.kaggle.com/manasgarg/ipl">Kaggle.com</a>'
            },
            xAxis: {
                categories: season,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Matches played',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' matches'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: "IPL Records",
                data: matchesPlayer
            }],
        });
    }
})();


(function matchesWon() {
    fetch('./output/matchesWonPerTeam.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const season = Object.keys(records);
            const scorePerTeam = objectToArray(Object.values(records));
            lineChart(season, scorePerTeam);
        })
        .catch(err => {
            console.error(err);
        })


    function objectToArray(records) {
        const IPLteam = Object.keys(records[0]);
        let eachTeam = {};

        for (let team of IPLteam) {
            eachTeam[team] = [];
        }

        for (let season of records) {
            for (let team of IPLteam) {
                eachTeam[team].push(season[team]);
            }
        }

        const graphFormat = [];
        for (let score in eachTeam) {
            graphFormat.push({ name: score, data: eachTeam[score] });
        }
        return graphFormat;
    }


    function lineChart(season, scorePerTeam) {
        Highcharts.theme = {
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
                '#FF9655', '#FFF263', '#6AF9C4']
        };
        Highcharts.setOptions(Highcharts.theme);
        Highcharts.chart('matchesWonPerTeam', {

            title: {
                text: 'Matches Won per team in each season'
            },

            subtitle: {
                text: 'Source: https://www.kaggle.com/manasgarg/ipl">Kaggle.com</a>'
            },

            yAxis: {
                title: {
                    text: 'Number of matches won'
                }
            },

            xAxis: {
                accessibility: {
                    rangeDescription: season
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: scorePerTeam,

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
})();


(function extraRun() {
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
        Highcharts.theme = {
            colors: ['#05736a']
        };
        Highcharts.setOptions(Highcharts.theme);
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

(function economicalBowler() {
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
        Highcharts.theme = {
            colors: ['#88f7da', '#e488f7', '#ad050d', '#c2a04c', '#78046e', '#912504', '#917a04',
                '#219104', '#05ad43', '#0597ad']
        };
        Highcharts.setOptions(Highcharts.theme);
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
                pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
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

(function bothTossMatch() {
    fetch('./output/wonTossMatch.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const team = Object.keys(records);
            const matchWon = Object.values(records);
            barChart(team, matchWon);
        })
        .catch(err => {
            console.error(err);
        })

    function barChart(team, matchWon) {
        Highcharts.theme = {
            colors: ['#177a80']
        }
        Highcharts.setOptions(Highcharts.theme);
        Highcharts.chart('wonTossMatch', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 25,
                    depth: 70
                }
            },
            title: {
                text: 'Team won the toss and also won the match'
            },
            subtitle: {
                text: ''
            },
            plotOptions: {
                column: {
                    depth: 45
                }
            },
            xAxis: {
                categories: team,
                labels: {
                    skew3d: true,
                    style: {
                        fontSize: '16px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [{
                name: 'Won toss and matches',
                data: matchWon
            }]
        });
    }
})();

(function manOfMatch() {
    fetch('./output/playerOfMatch.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const { finalData, nodeStructure } = objectToArray(records);
            organisedChart(finalData, nodeStructure);
        })
        .catch(err => {
            console.error(err);
        })
    function objectToArray(records) {
        const chartFormat = [['IPL', 'Season']];
        const season = [];
        const manOfmatch = [];
        const nodeStructure = [{ id: 'IPL' }, { id: 'Season' }];
        for (let player in records) {
            season.push(['Season', records[player].season]);
            nodeStructure.push({ id: records[player].season, title: 'Season' });
            manOfmatch.push([records[player].season, records[player].manOfMatch]);
            nodeStructure.push({ id: records[player].manOfMatch, title: 'Man of the match' });
        }
        const finalData = chartFormat.concat(season).concat(manOfmatch);
        return { finalData, nodeStructure };
    }

    function organisedChart(records, ids) {
        console.log(records, ids);

        Highcharts.chart('playerOfMatch', {
            chart: {
                height: 400,
                inverted: true
            },

            title: {
                text: 'Man of the match in each season'
            },

            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        var nodeName = point.toNode.name,
                            nodeId = point.toNode.id,
                            nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
                            parentDesc = point.fromNode.id;
                        return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
                    }
                }
            },

            series: [{
                type: 'organization',
                name: 'IPL',
                keys: ['from', 'to'],
                data: records,
                levels: [{
                    level: 0,
                    color: 'silver',
                    dataLabels: {
                        color: 'black'
                    },
                    height: 20
                }, {
                    level: 1,
                    color: '#e8886b',
                    dataLabels: {
                        color: 'black'
                    },
                    height: 20
                }, {
                    level: 2,
                    color: '#e488f7'
                }, {
                    level: 3,
                    color: '#5bbfe3',
                    dataLabels: {
                        color: 'black'
                    }
                }],
                nodes: ids,
                colorByPoint: false,
                color: '#007ad0',
                dataLabels: {
                    color: 'white'
                },
                borderColor: 'white',
                nodeWidth: 65
            }],
            tooltip: {
                outside: true
            },
            exporting: {
                allowHTML: true,
                sourceWidth: 800,
                sourceHeight: 600
            }

        });

    }

})();

(function dismissed() {
    fetch('./output/dismissedPlayer.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const data = objectToArray(records);
            barChart(data);
        })
        .catch(err => {
            console.error(err);
        })
    function objectToArray(records) {

        const formatData = [];
        for (let player in records) {
            formatData.push([`${records[player].batsman} vs ${records[player].bowler}`, records[player].count])
        }
        return formatData;
    }


    function barChart(records) {
        Highcharts.theme = {
            colors: ['#e8886b']
        }
        Highcharts.setOptions(Highcharts.theme);
        Highcharts.chart('dismissedPlayer', {
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
                    rotation: -40,
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
})();


(function strikeRate() {

    fetch('./output/strikeRate.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const { IPLseason, STRIKE_RATE } = objectToArray(records);
            lineChart(IPLseason, STRIKE_RATE);
        })
        .catch(err => {
            console.error(err);
        })

    function objectToArray(records) {
        const IPLseason = [];
        const STRIKE_RATE = []
        for (let season of records) {
            IPLseason.push(season.season);
            STRIKE_RATE.push(season.strikeRate);
        }
        return { IPLseason, STRIKE_RATE };
    }

    function lineChart(IPLseason, STRIKE_RATE) {
        Highcharts.theme = {
            colors: ['#12b556']
        }
        Highcharts.setOptions(Highcharts.theme);
        Highcharts.chart('strikeRate', {

            title: {
                text: 'StrikeRate of DHONI in IPL'
            },

            subtitle: {
                text: 'Source: Kaggle.com'
            },

            yAxis: {
                title: {
                    text: 'StrikeRate'
                }
            },

            xAxis: {
                accessibility: {
                    rangeDescription: IPLseason
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'StrikeRate',
                data: STRIKE_RATE
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
})();

(function superOver() {
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
        Highcharts.theme = {
            colors: ['#6e377a']
        }
        Highcharts.setOptions(Highcharts.theme);
        Highcharts.chart('superOverBowler', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Economical Bowler in super over'
            },
            subtitle: {
                text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">kaggle</a>'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -40,
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
                pointFormat: 'Average Run <b>{point.y:.1f} </b>'
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










