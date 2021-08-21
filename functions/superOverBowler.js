// Find the bowler with the best economy in super overs
const dataSheet = require('./extraction');

const path = '/../src/data/deliveries.csv';
dataSheet.fetching(path, superOver);

function superOver(IPLrecords) {
    const bowler = IPLrecords.reduce(bowledSuperOver, {});
    const SUPER_OVER=objectToArray(bowler);
    SUPER_OVER.sort((a,b)=>{return b.runs- a.runs});
    
    const outputPath='../src/public/output/superOverBowler.json';
    dataSheet.tranferToJSON(JSON.stringify(SUPER_OVER.shift()),outputPath);
}

function bowledSuperOver(bowler, records) {
    if (records.is_super_over != 0) {
        bowler[records.bowler] = bowler[records.bowler] ??0;
        bowler[records.bowler] += +records.is_super_over;
    }
    return bowler;
}

function objectToArray(bowler){
    const array=[];
    for(let ele in bowler){
        array.push({player:ele, runs:bowler[ele]});
    }
    return array;
}