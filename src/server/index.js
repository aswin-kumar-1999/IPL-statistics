const dataSheet = require('../../functions/extraction');
const numberOfMatchesPerYear = require('../../functions/matchesPerYear');
const numberOfMatchesWonPerTeam = require('../../functions/matchesWonPerTeam');
const extraScorePerTeam = require('../../functions/extraRunPerTeam');
const top10EconomicBowler = require('../../functions/economicalBowler');
const numberOfTimesWonTossNMatch = require('../../functions/wonTossMatch');
const playerOfMatchPerSeason = require('../../functions/playerOfMatch');
const numberOfPlayerDismissed = require('../../functions/dismissedPlayer');
const bestSuperOverBowler = require('../../functions/superOverBowler');
const IPLstrikeRate = require('../../functions/strikeRate');
const path=require('path');

// const pathOfDeliveries = path.resolve('./src/data/deliveries.csv');
// const pathOfMatches = path.resolve('./src/data/matches.csv');
const pathOfDeliveries = path.join(__dirname,'../data/deliveries.csv');
const pathOfMatches = path.join(__dirname,'../data/matches.csv');
dataSheet.fetching(pathOfDeliveries, pathOfMatches, IPLrecords);

function IPLrecords(IPLdeliveries, IPLmatches) {
    numberOfMatchesPerYear(IPLmatches);
    numberOfMatchesWonPerTeam(IPLmatches);
    extraScorePerTeam(IPLmatches, IPLdeliveries);
    top10EconomicBowler(IPLmatches, IPLdeliveries);
    numberOfTimesWonTossNMatch(IPLmatches, IPLdeliveries);
    playerOfMatchPerSeason(IPLmatches);
    IPLstrikeRate(IPLmatches, IPLdeliveries);
    numberOfPlayerDismissed(IPLdeliveries);
    bestSuperOverBowler(IPLdeliveries);
}
