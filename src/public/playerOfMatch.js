(function chart() {
    fetch('./output/playerOfMatch.json')
        .then((data) => {
            return data.json();
        }).then((records) => {
            const {finalData,nodeStructure}=objectToArray(records);
            organisedChart(finalData,nodeStructure);
        })
        .catch(err => {
            console.error(err);
        })
        function objectToArray(records){    
            const chartFormat=[['IPL','Season']];
            const season=[];
            const manOfmatch=[];
            const nodeStructure=[{id: 'IPL'},{id:'Season'}];
            for(let player in records){
                season.push(['Season',records[player].season]);
                nodeStructure.push({id:records[player].season,title:'Season'});
                manOfmatch.push([records[player].season,records[player].manOfMatch]);
                nodeStructure.push({id:records[player].manOfMatch,title:'Man of the match'});
            }
            const finalData=chartFormat.concat(season).concat(manOfmatch);
            return {finalData,nodeStructure};
        }
        
        function organisedChart(records,ids){
            console.log(records,ids);
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
                        color: 'silver',
                        dataLabels: {
                            color: 'black'
                        },
                        height: 20
                    }, {
                        level: 2,
                        color: '#980104'
                    }, {
                        level: 4,
                        color: '#359154'
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
function objectToArray(records){    
    const chartFormat=[['IPL','Season']];
    const season=[];
    const manOfmatch=[];
    const nodeStructure=[{id: 'IPL'},{id:'Season'}];
    for(let player in records){
        season.push(['Season',records[player].season]);
        nodeStructure.push({id:records[player].season,title:'Season'});
        manOfmatch.push([records[player].season,records[player].manOfMatch]);
        nodeStructure.push({id:records[player].manOfMatch,title:'Man of the match'});
    }
    const finalData=chartFormat.concat(season).concat(manOfmatch);
    return {finalData,nodeStructure};
}

function organisedChart(records,ids){
    console.log(records,ids);
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
                color: 'silver',
                dataLabels: {
                    color: 'black'
                },
                height: 20
            }, {
                level: 2,
                color: '#980104'
            }, {
                level: 4,
                color: '#359154'
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
