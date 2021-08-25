// Find the bowler with the best economy in super overs
/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet
 */

const dataSheet = require('./extraction');

const path = '/../src/data/deliveries.csv';
dataSheet.fetching(path, superOver);

/**
 * Finding of economic bowler in super over
 * @function superOver
 * @param {Array} IPLrecords - Details of each balls in IPL
 * @property {Object} bowler - bowler bowled in super over
 * @property {Array} SUPER_OVER - bowler bowled in super over in form of array object
 * @property {String} outputPath - Path to dump output
 */

function superOver(IPLrecords) {
    const bowler = IPLrecords.reduce(bowledSuperOver, {});
    const SUPER_OVER=objectToArray(bowler);
    SUPER_OVER.sort((a,b)=>{return b.runs- a.runs});
    
    const outputPath='../src/public/output/superOverBowler.json';
    dataSheet.tranferToJSON(JSON.stringify(SUPER_OVER.shift()),outputPath);
}

/**
 * Find the bowler who bowled the super over
 * @param {Object} bowler - Accumulation of all bowler who bowled super over
 * @param {Object} records - Details og each ball
 * @returns {object} - bowler who bowled super over
 */

function bowledSuperOver(bowler, records) {
    if (records.is_super_over != 0) {
        bowler[records.bowler] = bowler[records.bowler] ??0;
        bowler[records.bowler] += +records.is_super_over;
    }
    return bowler;
}

/**
 * Converting object into array
 * @function objectToArray 
 * @param {Object} bowler - bowler who bowled super over
 * @returns {Array} - bowler who bowled super over and the runs they gave
 */
function objectToArray(bowler){
    const array=[];
    for(let ele in bowler){
        array.push({player:ele, runs:bowler[ele]});
    }
    return array;
}