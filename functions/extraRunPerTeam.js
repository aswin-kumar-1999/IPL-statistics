const dataSheet=require('./extraction');

const path='/../src/data/deliveries.csv';
dataSheet.fetching(path,matches);

function matches(IPLdeliveries){
    const path='/../src/data/matches.csv'
        dataSheet.fetching(path,extraRunPerTeam,IPLdeliveries);
}

function extraRunPerTeam(IPLmatches,IPLdeliveries) {
    const extraScores={};
    let min=Infinity;
    let max=-Infinity; 
    // console.log(IPLmatches);
    IPLmatches.forEach(IPL2016);
    IPLdeliveries.forEach(extraRuns);
    
     function IPL2016(records) {
        extraScores[records.team1]=0;
        if(records.season ==2016){
            if(min>records.id){
                min=records.id;
            }
            if(max<records.id){
                max=records.id;
            }
        }
    }

    function extraRuns(records){
        if(records.match_id >= min && records.match_id<=max){
            extraScores[records.bowling_team]+=+records.extra_runs;
        }
    }
    const outputPath='../src/public/output/extraRunPerTeam.json';
    dataSheet.tranferToJSON(JSON.stringify(extraScores),outputPath);
}

