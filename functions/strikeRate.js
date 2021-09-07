const dataSheet = require('./extraction');
const path = require('path');

/**
 * Calculate the Strike rate of each player n IPL per season
 * @function IPLstrikeRate
 * @param {Array} iplMatch - Stroes the details of all the matches in IPL
 * @param {Array} iplDeliveries - Stores the details of each ball in the IPL 
* @property {Array} season - have details of staring and ending match ID per season
* @property {Array} STRIKE_RATE - Organised detail of Starting and ending match ID for further use
* @property {Object} calStrike - contains details of StrikeRate,player name, number of over player 
 */
function IPLstrikeRate(iplMatch, iplDeliveries) {
    let min = Infinity;
    let max = -Infinity;
    const player = "MS Dhoni";
    let season = {};

    iplMatch.forEach(matchIDPerSeason);
    const playerDeliveries = iplDeliveries.filter(elem => elem.batsman === player);

    for (let balls of playerDeliveries) {
        for (let elem in season) {
            if (balls.match_id >= +season[elem].min && balls.match_id <= +season[elem].max) {
                season[elem].run += +balls.batsman_runs;
                season[elem].balls += 1;
            }
        }
    }

    /**
   * Finding starting and ending match ID of each season
   * @function matchIDPerSeason
   * @param {Object} records - Contain details of a match
   */

    function matchIDPerSeason(records) {
        if (season[records.season] == undefined) {
            season[records.season] = {};
            season[records.season].run = 0;
            season[records.season].balls = 0;
            season[records.season].min = 0;
        }

        if (season[records.season].min == 0) {
            season[records.season].min = records.id;
        }
        season[records.season].max = records.id;
    }
    const strikeRatePerSeason = [];

    for (let elem in season) {
        const overs = season[elem].balls / 6 + (season[elem].balls % 6) / 10;
        const strike = season[elem].run / overs;
        strikeRatePerSeason.push({ season: elem, strikeRate: +strike.toFixed(2) });
    }

    const outputPath = path.join(__dirname, '../src/public/output/strikeRate.json');
    dataSheet.tranferToJSON(JSON.stringify(strikeRatePerSeason), outputPath);
}

module.exports = IPLstrikeRate;