
const parse = require('csv-parse');
const fs = require('fs');

/**
 * Fetching data from other files 
 * @function fetching 
 * @param {String} path  - path of the file to extract data
 * @param {Array} IPLdeliveries - records of IPL deliveries 
 * @property {Array} IPLrecords - stores all the details of IPL
 */
function fetching(path,callback,IPLdeliveries){
    
    const IPLrecords = [];

    fs.createReadStream(__dirname + path).pipe(
        parse({
            delimiter: ',',
            columns: true,
            trim: true
        })
    )
        .on('data', function (record) {
            IPLrecords.push(record)
        })
        .on('end', function () {
           /**
            * call the respective operation to be performed
            * @function callback 
            */
            callback(IPLrecords,IPLdeliveries);
        })
    
}

/**
 * Transfer the output into JSON files
 * @param {String} data Output data to be printed in json 
 * @param {String} path Path to dump the JSON files
 */
function tranferToJSON(data,path) {
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
 
module.exports={fetching,tranferToJSON};