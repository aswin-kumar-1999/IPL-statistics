// Top 10 economical bowlers in the year 2015

/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet
 */
const path = require('path');
const dataSheet = require('./extraction');

/**
 * Finding the economical bowler for each season
 * @function top10EconomicBowler
 * @param {Array} iplMatches  - Records of matches per season
 * @param {Array} iplDeliveries - Records of all the ball per match
 * @property {Array} bowlersScore - bowler with there score
 * @property {Array} bowlerOver - number of over bowled per bowler
 * @property {number} min - Staring match ID of that season
 * @property {number} max - Ending match ID of that season 
 */

function top10EconomicBowler(iplMatches, iplDeliveries) {

    let bowlersScore = [];
    let bowlerOver = [];
    let min = Infinity;
    let max = -Infinity;

    iplMatches.forEach(ipl2015);
    iplDeliveries.forEach(ecoBowler);

    /**
     * Find the starting and ending match ID
     * @function IPL2015
     * @param {Object} records - details of each match 
     */

    function ipl2015(records) {
        if (records.season == 2015) {
            if (min > records.id) {
                min = records.id;
            }
            if (max < records.id) {
                max = records.id;
            }
        }
    }

    /**
     * finding run given by bowler per season and number of over bowled
     * @function ecoBowler 
     * @param {Object} record - details of each ball in IPL 
     */

    function ecoBowler(record) {
        if (record.match_id >= min && record.match_id <= max) {
            if (bowlersScore[record.bowler] == undefined) {
                bowlersScore[record.bowler] = { runs: 0, balls: 0 };

                // bowlerOver[record.bowler] = { over: 0, pre: 0 };
                // bowlerOver[record.bowler] = { ball:0};
            }
            bowlersScore[record.bowler].runs += (+record.total_runs);
            bowlersScore[record.bowler].balls += 1;

            // bowlerOver[record.bowler].ball += +1;
            // if (bowlerOver[record.bowler].pre != record.over) {
            //     bowlerOver[record.bowler].over += 1;
            //     bowlerOver[record.bowler].pre = +record.over;
            // }
        }
    }
    let final = [];
    for (let item in bowlersScore) {
        // const avgScore = bowlersScore[item] / bowlerOver[item].over;
        const over = bowlersScore[item].balls / 6 + (bowlersScore[item].balls % 6) / 10;
        const avgScore = bowlersScore[item].runs / over;
        final.push({ bowler: item, avgRun: +avgScore.toFixed(2) });
    }

    final.sort((a, b) => { return a.avgRun - b.avgRun });
    const top10Bowler = [];

    for (let i = 0; i < 10; i++) {
        top10Bowler.push(final[i]);
    }

    const outputPath = path.join(__dirname, '../src/public/output/economicalBowler.json');
    dataSheet.tranferToJSON(JSON.stringify(top10Bowler), outputPath);
}

module.exports = top10EconomicBowler;