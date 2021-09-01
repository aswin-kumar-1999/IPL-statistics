/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet 
 */
const dataSheet = require('./extraction');
const path = require('path')
/**
 * Find highest number of time title won for  "player of the matches"
 * @function playerOfMatchPerSeason
 * @param {Array} IPLmatch - IPL records of all the matches
 * @property {Array} manOfMatch - Top list of player who won man of the match
 * @property {String} outputPath - Path to dump the Output files
 * @property {Object} MAN_OF_THE_MATCH - number of time player who won the man of the match
*/

function playerOfMatchPerSeason(IPLmatch) {
    const MAN_OF_THE_MATCH = {};
    const manOfMatch = {};
    IPLmatch.forEach(season);
    IPLmatch.reduce(manOfTheMatch);

    /**
     * Count the players how won the man of the match
     * @function manOfTheMatch 
     * @param {Object} tot - Accumulate all the player who won player of match 
     * @param {Object} match - contains details of each the match
     */

    function season(element) {
        MAN_OF_THE_MATCH[element.season] = {};
        manOfMatch[element.season] = [];

    }
    function manOfTheMatch(tot, match) {

        MAN_OF_THE_MATCH[match.season][match.player_of_match] = MAN_OF_THE_MATCH[match.season][match.player_of_match] ?? 0;
        MAN_OF_THE_MATCH[match.season][match.player_of_match] += 1
        return MAN_OF_THE_MATCH;
    }

    for (let season in MAN_OF_THE_MATCH) {
        for (let player in MAN_OF_THE_MATCH[season])
            manOfMatch[season].push({ name: player, count: MAN_OF_THE_MATCH[season][player] });
    }
    const manOfMatchPerSeason = [];
    for (let season in manOfMatch) {
        manOfMatch[season].sort((a, b) => b.count - a.count)
        const manofSeason = manOfMatch[season].shift();
        manOfMatchPerSeason.push({ season: +season, manOfMatch: manofSeason.name })
    }

    const outputPath = path.join(__dirname,'../src/public/output/playerOfMatch.json');
    dataSheet.tranferToJSON(JSON.stringify(manOfMatchPerSeason), outputPath);
}




module.exports = playerOfMatchPerSeason;