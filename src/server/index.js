const dataSheet = require('/media/aswin/Work Drive/JavaScript/IPL_Drill/functions/extraction.js');
const numberOfMatchesPerYear = require('../../functions/matchesPerYear');
const numberOfMatchesWonPerTeam = require('../../functions/matchesWonPerTeam');
const extraScorePerTeam = require('../../functions/extraRunPerTeam');
const top10EconomicBowler = require('../../functions/economicalBowler');
const numberOfTimesWonTossNMatch = require('../../functions/wonTossMatch');
const playerOfMatchPerSeason = require('../../functions/playerOfMatch');
const numberOfPlayerDismissed = require('../../functions/dismissedPlayer');
const bestSuperOverBowler = require('../../functions/superOverBowler');
const IPLstrikeRate = require('../../functions/strikeRate');


const pathOfDeliveries = '/media/aswin/Work Drive/JavaScript/IPL_Drill/src/data/deliveries.csv';
const pathOfMatches = '/media/aswin/Work Drive/JavaScript/IPL_Drill/src/data/matches.csv';
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
