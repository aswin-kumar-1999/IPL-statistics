/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet 
 */

const dataSheet = require('./extraction');
const path = require('path');

/**
 * Find highest number of time title won for  "player of the matches"
 * @function playerOfMatchPerSeason
 * @param {Array} iplMatch - IPL records of all the matches
 * @property {Array} manOfMatch - Top list of player who won man of the match
 * @property {String} outputPath - Path to dump the Output files
 * @property {Object} playerOfMatch - number of time player who won the man of the match
*/

function playerOfMatchPerSeason(iplMatch) {
    const playerOfMatch = {};
    const manOfMatch = {};

    iplMatch.reduce(manOfTheMatch);

    /**
     * Count the players how won the man of the match
     * @function manOfTheMatch 
     * @param {Object} tot - Accumulate all the player who won player of match 
     * @param {Object} match - contains details of each the match
     */

    function manOfTheMatch(tot, match) {

        if (manOfMatch[match.season] == undefined) {
            playerOfMatch[match.season] = {};
            manOfMatch[match.season] = [];
        }

        playerOfMatch[match.season][match.player_of_match] = playerOfMatch[match.season][match.player_of_match] ?? 0;
        playerOfMatch[match.season][match.player_of_match] += 1
        return playerOfMatch;
    }

    for (let season in playerOfMatch) {
        for (let player in playerOfMatch[season])
            manOfMatch[season].push({ name: player, count: playerOfMatch[season][player] });
    }

    const manOfMatchPerSeason = [];
    for (let season in manOfMatch) {
        manOfMatch[season].sort((a, b) => b.count - a.count)
        const manofSeason = manOfMatch[season].shift();
        manOfMatchPerSeason.push({ season: +season, manOfMatch: manofSeason.name })
    }

    const outputPath = path.join(__dirname, '../src/public/output/playerOfMatch.json');
    dataSheet.tranferToJSON(JSON.stringify(manOfMatchPerSeason), outputPath);
}




module.exports = playerOfMatchPerSeason;