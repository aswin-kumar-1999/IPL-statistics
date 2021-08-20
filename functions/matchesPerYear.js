const dataSheet=require('./extraction');

const path='/../src/data/matches.csv';
dataSheet.fetching(path,matchesPerYear);

function matchesPerYear(IPLrecords) {

    const numberOfMatchesPerYear = {};
    IPLrecords.forEach(element => {
        numberOfMatchesPerYear[element.season] = numberOfMatchesPerYear[element.season] ?? 1;
        numberOfMatchesPerYear[element.season] += 1;
    });
    const outputPath='../src/public/output/matchesPerYear.json';
    dataSheet.tranferToJSON(JSON.stringify(numberOfMatchesPerYear),outputPath);
}

