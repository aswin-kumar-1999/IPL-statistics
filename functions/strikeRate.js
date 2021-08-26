// Find the strike rate of a batsman for each season
/**
 * Fetching the data from matches.csv and deliveries.csv files
 *  @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet
 */
const dataSheet = require('./extraction');

const path = '/../src/data/deliveries.csv';
dataSheet.fetching(path, matches);


function matches(IPLdeliveries) {
    const path = '/../src/data/matches.csv'
    dataSheet.fetching(path, strikeRate, IPLdeliveries);
}
/**
 * Calculate the Strike rate of each player n IPL per season
 * @function strikeRate
 * @param {Array} IPLmatches - Stroes the details of all the matches in IPL
 * @param {Array} IPLdeliveries - Stores the details of each ball in the IPL 
* @property {Array} season - have details of staring and ending match ID per season
* @property {Array} STRIKE_RATE - Organised detail of Starting and ending match ID for further use
* @property {Object} calStrike - contains details of StrikeRate,player name, number of over player
     
 */
function strikeRate(IPLmatches, IPLdeliveries) {
    let min = Infinity;
    let max = -Infinity;

    let season = [];
    const STRIKE_RATE = [];
    const calStrike = {};
    IPLmatches.forEach(IPLseason);
    IPLmatches.forEach(matchIDPerSeason);
    for (let i in season) {
        STRIKE_RATE.push({ year: i, min: season[i].min, max: season[i].max });
    }
    IPLdeliveries.reduce(strikeRateCalc);

    /**
     * Adding object to every season inorder to add further details
     * @function IPLseason 
     * @param {Object} records - Contain details of a match
     */
    function IPLseason(records) {
        season[records.season] = {};
        calStrike[records.season] = {};
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
    /**
     * Strike rate is calculated for each player for each season
     * @function strikeRateCalc
     * @param {Object} tot - accumulate all the runs scored per player per season
     * @param {Object} records - Contain details of each balls
     * @returns {object} - all the runs scored per player per season
     */
    function strikeRateCalc(tot, records) {
        STRIKE_RATE.forEach(elem => {
            if (elem.min <= records.match_id && elem.max >= records.match_id) {
                calStrike[elem.year][records.batsman] = calStrike[elem.year][records.batsman] ?? { run: 0, over: 0, pre: 0 };
                calStrike[elem.year][records.batsman].run += +records.batsman_runs;
                if (calStrike[elem.year][records.batsman].over == 0) {
                    calStrike[elem.year][records.batsman].over = 1;
                    calStrike[elem.year][records.batsman].pre = records.over;
                }
                if (calStrike[elem.year][records.batsman].pre != records.over) {
                    calStrike[elem.year][records.batsman].over += 1;
                    calStrike[elem.year][records.batsman].pre = records.over;
                }
            }
        })
        return calStrike;
    }
    const finalStrike = [];
   
    for (let element in calStrike) {
        for (let strike in calStrike[element]) {
            const run = calStrike[element][strike].run;
            const over = calStrike[element][strike].over;
            const avg = (run / over);
            finalStrike.push({ season: element, player: strike, avg_score: avg })
        }
    }

    const outputPath = '../src/public/output/strikeRate.json';
    dataSheet.tranferToJSON(JSON.stringify(finalStrike), outputPath);
}

