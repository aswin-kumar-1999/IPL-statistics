const dataSheet = require('./extraction');
const path = require('path');

/**
 * Calculate the Strike rate of each player n IPL per season
 * @function IPLstrikeRate
 * @param {Array} IPLmatches - Stroes the details of all the matches in IPL
 * @param {Array} IPLdeliveries - Stores the details of each ball in the IPL 
* @property {Array} season - have details of staring and ending match ID per season
* @property {Array} STRIKE_RATE - Organised detail of Starting and ending match ID for further use
* @property {Object} calStrike - contains details of StrikeRate,player name, number of over player 
 */
function IPLstrikeRate(IPLmatches, IPLdeliveries) {
    let min = Infinity;
    let max = -Infinity;
    const player = "MS Dhoni";
    let season = {};
    const STRIKE_RATE = [];

    IPLmatches.forEach(IPLseason);
    IPLmatches.forEach(matchIDPerSeason);
    const playerDeliveries = IPLdeliveries.filter(elem => elem.batsman === player);

    for (let balls of playerDeliveries) {
        for (let elem in season) {
            if (balls.match_id >= +season[elem].min && balls.match_id <= +season[elem].max) {
                season[elem].runRate += +balls.batsman_runs;
                if (season[elem].over == 0) {
                    season[elem].over = 1;
                    season[elem].pre = balls.over;
                }
                else if (season[elem].pre != balls.over) {
                    season[elem].over += 1;
                    season[elem].pre = balls.over;
                }
            }
        }
    }
    /**
        * Adding object to every season inorder to add further details
        * @function IPLseason 
        * @param {Object} records - Contain details of a match
        */
    function IPLseason(records) {
        season[records.season] = {};
        season[records.season].runRate = 0;
        season[records.season].over = 0;
        season[records.season].min = 0;
    }

    /**
   * Finding starting and ending match ID of each season
   * @function matchIDPerSeason
   * @param {Object} records - Contain details of a match
   */

    function matchIDPerSeason(records) {
        if (season[records.season].min == 0) {
            season[records.season].min = records.id;
        }
        season[records.season].max = records.id;
    }
    const strikeRatePerSeason = [];
    for (let elem in season) {
        const strike = season[elem].runRate / season[elem].over;
        strikeRatePerSeason.push({ season: elem, strikeRate: +strike.toPrecision(2) });
    }

    const outputPath = path.join(__dirname,'../src/public/output/strikeRate.json');
    dataSheet.tranferToJSON(JSON.stringify(strikeRatePerSeason), outputPath);
}

module.exports = IPLstrikeRate;