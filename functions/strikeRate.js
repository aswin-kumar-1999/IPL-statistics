// Find the strike rate of a batsman for each season
const dataSheet = require('./extraction');

const path = '/../src/data/deliveries.csv';
dataSheet.fetching(path, matches);

function matches(IPLdeliveries) {
    const path = '/../src/data/matches.csv'
    dataSheet.fetching(path, strikeRate, IPLdeliveries);
}

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


    function IPLseason(records) {
        season[records.season] = {};
        calStrike[records.season] = {};
        season[records.season].min = 0;
    }

    function matchIDPerSeason(records) {
        if (season[records.season].min == 0) {
            season[records.season].min = records.id;
        }
        season[records.season].max = records.id;
    }

    function strikeRateCalc(tot, records) {
        STRIKE_RATE.forEach(elem => {
            if (elem.min <= records.match_id && elem.max >= records.match_id) {
                calStrike[elem.year][records.batsman]=calStrike[elem.year][records.batsman]??{run:0,over:0,pre:0};
                calStrike[elem.year][records.batsman].run +=+records.batsman_runs;
                if(calStrike[elem.year][records.batsman].over == 0){
                    calStrike[elem.year][records.batsman].over=1;
                    calStrike[elem.year][records.batsman].pre=records.over;
                }
                if(calStrike[elem.year][records.batsman].pre != records.over){
                    calStrike[elem.year][records.batsman].over +=1;
                    calStrike[elem.year][records.batsman].pre=records.over;
                }
            }
        })
        return calStrike;
    }
    const finalStrike=[];
    for(let element in calStrike){
       for(let strike in calStrike[element]){
           const run=calStrike[element][strike].run;
           const over=calStrike[element][strike].over;
           const avg=(run/over);
           finalStrike.push({season:element,player:calStrike[element][strike],avg_score:avg})
       }
    }

    const outputPath='../src/public/output/strikeRate.json';
    dataSheet.tranferToJSON(JSON.stringify(finalStrike),outputPath);
}

