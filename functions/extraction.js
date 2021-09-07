
const parse = require('csv-parse');
const fs = require('fs');

/**
 * Fetching data from other files 
 * @function fetching 
 * @param {String} path  - path of the file to extract data
 * @param {Array} iplDeliveries - records of IPL deliveries 
 * @property {Array} iplRecords - stores all the details of IPL
 */
function fetching(pathOfDeliveries, pathOfMatches, iplRecords) {

    const iplDeliveries = [];
    const iplMatches = [];
    fs.createReadStream(pathOfDeliveries).pipe(
        parse({
            delimiter: ',',
            columns: true,
            trim: true
        })
    )
        .on('data', function (record) {
            iplDeliveries.push(record)
        })
        .on('end', function () {

            fs.createReadStream(pathOfMatches).pipe(
                parse({
                    delimiter: ',',
                    columns: true,
                    trim: true
                })
            )
                .on('data', function (record) {
                    iplMatches.push(record)
                })
                .on('end', function () {
                    iplRecords(iplDeliveries, iplMatches);
                })
        })

}

/**
 * Transfer the output into JSON files
 * @param {String} data Output data to be printed in json 
 * @param {String} path Path to dump the JSON files
 */
function tranferToJSON(data, path) {
    fs.writeFile(path, data, err => {
        if (err) throw err;
    })
}



/**
 * convert data into json format and dump it
 * @module tranferToJSON 
 */
/**
 * fetch the data and convert it into array object
* @module fetching  
*/

module.exports = { fetching, tranferToJSON };