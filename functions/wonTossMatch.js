//Find the number of times each team won the toss and also won the match

/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet
 */
const path = require('path');
const dataSheet = require('./extraction');

/**
 * Finding player who won both toss and the match
 * @function numberOfTimesWonTossNMatch
 * @param {Array} IPLmatches - Contain match details of each season
 * @property {Object} tossMatchWin - details of team who won both toss and match
 * @property {String} outputPath - Path to dump the output
 */
function numberOfTimesWonTossNMatch(IPLmatches, IPLdeliveries) {
    const tossMatchWin = {};
    IPLmatches.reduce(winingAll);

    /**
     * Summing the number of time per team won both match and toss 
     * @function winingAll
     * @param {Object} tot - Accumulation of the team which won task and match 
     * @param {Object} team - Details of each matches  
     * @returns {Object} - contains details of team and number of tim it won both toss and match
     */
    function winingAll(tot, team) {
        if (team.toss_winner === team.winner) {
            tossMatchWin[team.winner] = tossMatchWin[team.winner] ?? 0;
            tossMatchWin[team.winner] += 1;
        }
        return tossMatchWin;
    }
    const outputPath = path.join(__dirname,'../src/public/output/wonTossMatch.json');
    dataSheet.tranferToJSON(JSON.stringify(tossMatchWin), outputPath);
}



module.exports = numberOfTimesWonTossNMatch;