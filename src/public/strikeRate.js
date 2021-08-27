
//[{name=season,y,drilldown=season}
(function chart() {
    fetch('./output/matchesPerYear.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const matchesPerSeason = objectToArray(records);
            // console.log(matchesPerSeason);
            fetchingStrikeRate(matchesPerSeason);
        })
        .catch(err => {
            console.error(err);
        })

})();

function fetchingStrikeRate(matchesPerSeason) {
    fetch('./output/strikeRate.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
           const strikeRate=modifyObject(records);
         //  console.log(strikeRate);
           barDrill(strikeRate,matchesPerSeason);
        })
        .catch(err => {
            console.error(err);
        })

}
// [{name:season,id:season,data=[[player,runrate]]}]
function modifyObject(records) {
    const playerPerSeason = {};
    // console.log(records);
    for (let players of records) {
        playerPerSeason[players.season] = {};
    }
    for (let players of records) {
        playerPerSeason[players.season][players.player] = players.avg_score;
    }
    // console.log(playerPerSeason);
    const data = {};
    for (let season in playerPerSeason) {
        data[season] = [];
    }
    for (let season in playerPerSeason) {
        const playerStrikeRate=[];
        for(let player in playerPerSeason[season]){
            const avgrun=playerPerSeason[season][player]
            playerStrikeRate.push([player,+avgrun]);
        }
        data[season].push(playerStrikeRate);
        // data[season].push(Object.entries(playerPerSeason[season]));

    }

    const final=[];
    for(let season in data){
        for(let player in data[season]){
            // console.log(data[season]);
            final.push({name:season,id:season,data:data[season]})
        }   
    }
     console.log(final);
     return final;
}


function objectToArray(records) {
    const data = [];
    for (let season in records) {
        data.push({ name: season, drilldown: season, y: records[season] });
    }
    console.log(data);
    return data;
}
function barDrill(strikeRate,matchesPerSeason) {
    Highcharts.chart('strikeRate', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Browser market shares. January, 2018'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Strike Rate",
                colorByPoint: true,
                data: matchesPerSeason,}],
        drilldown: {
            series: strikeRate
        }
    });
}