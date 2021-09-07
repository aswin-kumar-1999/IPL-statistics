function matchesplayed() {
    console.log('working');
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
};

function barChart(season, matchesPlayer) {
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

// // export default matchesplayed;
// module.exports=matchesplayed;