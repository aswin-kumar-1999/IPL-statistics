/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires module:'functions/extraction.js' 
 * @member dataSheet
 * @property {String} path - path of file from which data has to be fetched  
 */

const path = require('path');
const dataSheet = require('./extraction');

/**
 * Extra run given by the bowler in each team
 * @function extraRunPerTeam
 * @param {Array} iplMatches - Details of all matches happened in the season
 * @param {Array} iplDeliveries - Details of all the ball happened in every season
 * @property {object} extraScores - count scores given per team in that season
 * @property {number}  min - Starting match ID of that season
 * @property {number}  max - Ending match ID of that season
 */

function extraScorePerTeam(iplMatches, iplDeliveries) {
    
    const extraScores = {};
    let min = Infinity;
    let max = -Infinity;

    iplMatches.forEach(ipl2016);
    iplDeliveries.forEach(extraRuns);

    /**
     * calculate Starting and ending match ID of that season
     * @function IPL2016
     * @param {object} records - Each element of iplMatches 
     */

    function ipl2016(records) {
        extraScores[records.team1] = 0;
        if (records.season == 2016) {
            if (min > records.id) {
                min = records.id;
            }
            if (max < records.id) {
                max = records.id;
            }
        }
    }

    /**
     * Function used to find out extra run given by each player
     * @function extraRuns
     * @param {Object} records - Each element of the IPL deleveries
     */

    function extraRuns(records) {
        if (records.match_id >= min && records.match_id <= max) {
            extraScores[records.bowling_team] += +records.extra_runs;
        }
    }

    const outputPath = path.join(__dirname, '../src/public/output/extraRunPerTeam.json');
    dataSheet.tranferToJSON(JSON.stringify(extraScores), outputPath);
}

module.exports = extraScorePerTeam;
