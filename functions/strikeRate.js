const dataSheet = require('./extraction');
function IPLstrikeRate(IPLmatches, IPLdeliveries){
    let min = Infinity;
    let max = -Infinity;
    const player = "MS Dhoni";
    let season = {};
    const STRIKE_RATE = [];

    IPLmatches.forEach(IPLseason);
    IPLmatches.forEach(matchIDPerSeason);
    const playerDeliveries = IPLdeliveries.filter(elem => elem.batsman === player);

    for (let balls of playerDeliveries) {
        for (let elem in season) {
            if (balls.match_id >= +season[elem].min && balls.match_id <= +season[elem].max) {
                season[elem].runRate += +balls.batsman_runs;
                if(season[elem].over==0){
                    season[elem].over=1;
                    season[elem].pre=balls.over;
                }
                else if(season[elem].pre != balls.over) {
                    season[elem].over+=1;
                    season[elem].pre=balls.over;
                }
            }
        }
    }

    function IPLseason(records) {
        season[records.season] = {};
        season[records.season].runRate = 0;
        season[records.season].over = 0;
        season[records.season].min = 0;
    }

    function matchIDPerSeason(records) {
        if (season[records.season].min == 0) {
            season[records.season].min = records.id;
        }
        season[records.season].max = records.id;
    }
    const strikeRatePerSeason=[];
    for(let elem in season){
        const strike=season[elem].runRate/season[elem].over;
        strikeRatePerSeason.push({season:elem,strikeRate:+strike.toPrecision(2)});
    }

    const outputPath = '../public/output/strikeRate.json';
    dataSheet.tranferToJSON(JSON.stringify(strikeRatePerSeason), outputPath);
}

module.exports=IPLstrikeRate;