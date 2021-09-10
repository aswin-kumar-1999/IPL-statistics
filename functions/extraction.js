
const parse = require('csv-parse');
const fs = require('fs');

/**
 * Fetching data from other files 
 * @function fetching 
 * @param {String} path  - path of the file to extract data
 * @param {Array} iplDeliveries - records of IPL deliveries 
 * @property {Array} cb - stores all the details of IPL
 */
function fetching(pathOfDeliveries, pathOfMatches, cb) {
    if (typeof cb != 'function') {
        console.log('cb is not a function', err.stack);
    }
    else if (typeof pathOfDeliveries != 'string' || typeof pathOfMatches != 'string') {
        cb("Path is not defined");
    }
    else {
        try {
            const iplDeliveries = [];
            const iplMatches = [];
            fs.createReadStream(pathOfDeliveries)
                .on('error', function (err) {
                    cb(err.message)
                })
                .pipe(
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

                    fs.createReadStream(pathOfMatches)
                        .on('error', function (err) {
                            cb(err.message)
                        })
                        .pipe(
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
                            cb(null, iplDeliveries, iplMatches);
                        })
                })

        }
        catch (err) {
            cb(err);
        }
    }
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