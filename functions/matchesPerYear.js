const parse = require('csv-parse');
const fs = require('fs');

const IPLrecords = [];

fs.createReadStream(__dirname + '/../src/data/matches.csv').pipe(
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
       
        matchesPerYear(IPLrecords);
    })


function matchesPerYear(IPLrecords) {
    const numberOfMatchesPerYear = {};

    IPLrecords.forEach(element => {
        numberOfMatchesPerYear[element.season] = numberOfMatchesPerYear[element.season] ?? 1;
        numberOfMatchesPerYear[element.season] += 1;
    });
    // console.info(JSON.stringify(numberOfMatchesPerYear));
    tranferToJSON(JSON.stringify(numberOfMatchesPerYear));
}

function tranferToJSON(data) {
    fs.writeFile('../src/public/output/matchesPerYear.json', data, err => {
        if (err) throw err;
    })
}
