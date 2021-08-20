// Number of matches won per team per year in IPL.
const dataSheet=require('./extraction');

const path='/../src/data/matches.csv';
dataSheet.fetching(path,matchesWonPerYear);

function matchesWonPerYear(record){
    const matchWinners={};
    record.forEach(element => {
       matchWinners[element.season]={}; 
    });   
    record.forEach(element => {
        matchWinners[element.season][element.winner]= matchWinners[element.season][element.winner]?? 1;
        matchWinners[element.season][element.winner]+=1;
     });
     const outputPath='../src/public/output/matchesWonPerTeam.json';
    dataSheet.tranferToJSON(JSON.stringify(matchWinners),outputPath);
}