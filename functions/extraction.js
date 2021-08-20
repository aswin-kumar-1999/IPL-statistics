const parse = require('csv-parse');
const fs = require('fs');

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
           
            callback(IPLrecords,IPLdeliveries);
        })
    
}
function tranferToJSON(data,path) {
    fs.writeFile(path, data, err => {
        if (err) throw err;
    })
}


module.exports={fetching,tranferToJSON};