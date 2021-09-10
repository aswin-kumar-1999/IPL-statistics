/**
 * Fetching the data from matches.csv files
 * @requires module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched  
 * @member dataSheet - Contains fetching and transferToJSON functions
 */
const path = require('path');
const dataSheet = require('./extraction');

/**
 * find the number matches won per team per year
 * @function numberOfMatchesWonPerTeam 
 * @param {Array} record - All matches details of the IPL
 * @property {Object} matchWinners - Details of season and number of matches played per season  
*/

function numberOfMatchesWonPerTeam(record) {

    const matchWinners = {};
    
    record.forEach(element => {
        if(matchWinners[element.season] == undefined){
            matchWinners[element.season] = {};
        }
        matchWinners[element.season][element.winner] = matchWinners[element.season][element.winner] ?? 1;
        matchWinners[element.season][element.winner] += 1;
    });

    const outputPath = path.join(__dirname, '../src/public/output/matchesWonPerTeam.json');
    dataSheet.tranferToJSON(JSON.stringify(matchWinners), outputPath);
}







module.exports = numberOfMatchesWonPerTeam;