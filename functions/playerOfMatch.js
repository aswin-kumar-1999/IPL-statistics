/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet 
 */
const dataSheet = require('./extraction');

const path = '/../src/data/matches.csv';
dataSheet.fetching(path, playerOfMatch);

/**
 * Find highest number of time title won for  "player of the matches"
 * @function playerOfMatch
 * @param {Array} IPLmatch - IPL records of all the matches
 * @property {Array} manOfMatch - Top list of player who won man of the match
 * @property {String} outputPath - Path to dump the Output files
 * @property {Object} MAN_OF_THE_MATCH - number of time player who won the man of the match
*/

function playerOfMatch(IPLmatch) {
    const MAN_OF_THE_MATCH = {};
    const manOfMatch = [];
    IPLmatch.reduce(manOfTheMatch);

    /**
     * Count the players how won the man of the match
     * @function manOfTheMatch 
     * @param {Object} tot - Accumulate all the player who won player of match 
     * @param {Object} match - contains details of each the match
     */

    function manOfTheMatch(tot, match) {

        MAN_OF_THE_MATCH[match.player_of_match] = MAN_OF_THE_MATCH[match.player_of_match] ?? 0;
        MAN_OF_THE_MATCH[match.player_of_match] += 1
        return MAN_OF_THE_MATCH;
    }
  
    for (let i in MAN_OF_THE_MATCH) {
        manOfMatch.push({ name: i, count: MAN_OF_THE_MATCH[i] });
    }
    manOfMatch.sort((a, b) => { return b.count - a.count });

    const outputPath='../src/public/output/playerOfMatch.json';
    dataSheet.tranferToJSON(JSON.stringify(manOfMatch.shift()),outputPath);
}
