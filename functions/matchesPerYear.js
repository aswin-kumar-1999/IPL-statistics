/**
 * Fetching the data from matches.csv files
 * @requires module:'functions/extraction.js' - used to fetch data and also convert the data into json file
 * @property {String} path - path of file from which data has to be fetched  
 * @member dataSheet
 */
const dataSheet = require('./extraction');

const path = '/../src/data/matches.csv';
dataSheet.fetching(path, matchesPerYear);

/**
 * find the matches played per year
 * @function matchesPerYear 
 * @param {Array} IPLrecords - All matches details of the IPL
 * @property {Object} numberOfMatchesPerYear - Details of year and number of matches played
 * @property {String} outputPath - Path to dump the output 
*/

function matchesPerYear(IPLrecords) {

    const numberOfMatchesPerYear = {};
    IPLrecords.forEach(element => {
        numberOfMatchesPerYear[element.season] = numberOfMatchesPerYear[element.season] ?? 1;
        numberOfMatchesPerYear[element.season] += 1;
    });
    const outputPath = '../src/public/output/matchesPerYear.json';
    dataSheet.tranferToJSON(JSON.stringify(numberOfMatchesPerYear), outputPath);
}

