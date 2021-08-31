(function chart() {
    fetch('./output/wonTossMatch.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
          const team=Object.keys(records);
          const matchWon=Object.values(records);
           barChart(team,matchWon);
        })
        .catch(err => {
            console.error(err);
        })

        function barChart(team,matchWon){
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
                        depth: 25
                    }
                },
                xAxis: {
                    categories:team,
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

