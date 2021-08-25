/**
 * Fetching the data from matches.csv files
 * @requires module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched  
 * @member dataSheet - Contains fetching and transferToJSON functions
 */
const dataSheet=require('./extraction');

const path='/../src/data/matches.csv';
dataSheet.fetching(path,matchesWonPerYear);


/**
 * find the number matches won per team per year
 * @function matchesWonPerYear 
 * @param {Array} record - All matches details of the IPL
 * @property {Object} matchWinners - Details of season and number of matches played per season  
*/
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