const parse = require('csv-parse');
const fs = require('fs');

const IPLdeliveries = [];
const URL='/../src/data/deliveries.csv';
fs.createReadStream(__dirname + URL).pipe(
    parse({
        delimiter: ',',
        columns: true,
        trim: true
    })
)
    .on('data', function (record) {
        IPLdeliveries.push(record)
    })
    .on('end', function () {
       matches();
    })



const IPLmatches = [];
function matches(){
    fs.createReadStream(__dirname + '/../src/data/matches.csv').pipe(
        parse({
            delimiter: ',',
            columns: true,
            trim: true
        })
    )
        .on('data', function (record) {
            IPLmatches.push(record)
        })
        .on('end', function () {
            extraRunPerTeam(IPLmatches,IPLdeliveries);
        })
    
    
}

function extraRunPerTeam(IPLmatches,IPLdeliveries) {
    const extraScores={};
    let min=Infinity;
    let max=-Infinity; 
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
    tranferToJSON(JSON.stringify(extraScores));
}

function tranferToJSON(data) {
    fs.writeFile('../src/public/output/extraRunPerTeam.json', data, err => {
        if (err) throw err;
    })
}
