// Find the highest number of times one player has been dismissed by another player
/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet
 */

const path = require('path');
const dataSheet = require('./extraction');

/**
 * Finding table top dismissed player 
 * @function numberOfPlayerDismissed
 * @param {Array} iplRecords - Record of all balls in IPL
 * @property {Object} dismiss - count number of dimission per player
 * @property {Array} dismissPlayer - organising the dismiss into array 
 * @property {String} outputPath - path to dump the output 
 */


function numberOfPlayerDismissed(iplRecords) {
    const dismiss = {};
    const dismissPlayer = [];

    iplRecords.reduce(countDismiss);

    /**
     * function to count the dismissed per player
     * @function countDismiss 
     * @param {object} tot - accummulation of dismissed player 
     * @param {object} records - records of each ball
     * @returns {object} - number of dimission per player
     */
    function countDismiss(tot, records) {
        if (records.player_dismissed != '') {
            if (records.dismissal_kind != 'run out') {
                if (dismiss[records.player_dismissed] == undefined) {
                    dismiss[records.player_dismissed] = {}
                }
                dismiss[records.player_dismissed][records.bowler] = dismiss[records.player_dismissed][records.bowler] ?? 0;
                dismiss[records.player_dismissed][records.bowler] += 1;
            }
        }
        return dismiss;
    }

    for (let element in dismiss) {
        for (let dismissingBowler in dismiss[element]) {
            dismissPlayer.push({ batsman: element, bowler: dismissingBowler, count: dismiss[element][dismissingBowler] });
        }
    }

    dismissPlayer.sort((a, b) => { return b.count - a.count });
    const cnt = dismissPlayer.reduce(function (a, b) { return Math.max(a, b.count); }, 0);
    const dataChart = dismissPlayer.filter(elem => elem.count == cnt);
    // console.log(dataChart);

    const outputPath = path.join(__dirname, '../src/public/output/dismissedPlayer.json');
    dataSheet.tranferToJSON(JSON.stringify(dataChart), outputPath);
}


module.exports = numberOfPlayerDismissed;