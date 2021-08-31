(function chart() {
    fetch('./output/matchesWonPerTeam.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const season=Object.keys(records);
            const scorePerTeam=objectToArray(Object.values(records));
            barChart(season, scorePerTeam);
        })
        .catch(err => {
            console.error(err);
        })
})();

function objectToArray(records){
    const IPLteam=Object.keys(records[0]);
    let eachTeam={};
  
    for(let team of IPLteam){
        eachTeam[team]= [];
    }
   
    
    for(let season of records){
       for(let team of IPLteam){
        eachTeam[team].push(season[team]);
       }
    }

  const graphFormat=[];
    for(let score in eachTeam){
        graphFormat.push({name:score,data:eachTeam[score]});
    }
    return graphFormat;
}


function barChart(season,scorePerTeam){

    Highcharts.chart('matchesWonPerTeam', {

        title: {
            text: 'Matches Won per team in each season'
        },
    
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">Kaggle.com</a>'
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