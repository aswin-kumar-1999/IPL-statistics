// Number of matches won per team per year in IPL.
const parse = require('csv-parse');
const fs = require('fs');

const IPLrecords = [];

fs.createReadStream(__dirname + '/../src/data/matches.csv').pipe(
    parse({
        delimiter: ',',
        columns: true,
        trim: true
    })
)
    .on('data', function (record) {
        IPLrecords.push(record)
    })
    .on('end', function () {

        matchesWonPerYear(IPLrecords);
    })

function matchesWonPerYear(record){
    const matchWinners={};
   // console.log(record[0]);
    record.forEach(element => {
       matchWinners[element.season]={}; 
    });   
    record.forEach(element => {
        matchWinners[element.season][element.winner]= matchWinners[element.season][element.winner]?? 1;
        matchWinners[element.season][element.winner]+=1;
     });
    tranferToJSON(JSON.stringify(matchWinners));
}

function tranferToJSON(data) {
    fs.writeFile('../src/public/output/matchesWonPerTeam.json', data, err => {
        if (err) throw err;
    })
}