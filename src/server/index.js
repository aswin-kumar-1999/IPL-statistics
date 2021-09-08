const dataSheet = require('../../functions/extraction');
const numberOfMatchesPerYear = require('../../functions/matchesPerYear');
const numberOfMatchesWonPerTeam = require('../../functions/matchesWonPerTeam');
const extraScorePerTeam = require('../../functions/extraRunPerTeam');
const top10EconomicBowler = require('../../functions/economicalBowler');
const numberOfTimesWonTossNMatch = require('../../functions/wonTossMatch');
const playerOfMatchPerSeason = require('../../functions/playerOfMatch');
const numberOfPlayerDismissed = require('../../functions/dismissedPlayer');
const bestSuperOverBowler = require('../../functions/superOverBowler');
const iplStrikeRate = require('../../functions/strikeRate');

const path=require('path');

const pathOfDeliveries = path.join(__dirname,'../data/deliveries.csv');
const pathOfMatches = path.join(__dirname,'../data/matches.csv');
dataSheet.fetching(pathOfDeliveries, pathOfMatches, iplRecords);

function iplRecords(err,iplDeliveries, iplMatches) {
    if(err != null){
        console.log("ERROR",err);
    }
    else{
        try{
            numberOfMatchesPerYear(iplMatches);
            numberOfMatchesWonPerTeam(iplMatches);
            extraScorePerTeam(iplMatches, iplDeliveries);
            top10EconomicBowler(iplMatches, iplDeliveries);
            numberOfTimesWonTossNMatch(iplMatches, iplDeliveries);
            playerOfMatchPerSeason(iplMatches);
            iplStrikeRate(iplMatches, iplDeliveries);
            numberOfPlayerDismissed(iplDeliveries);
            bestSuperOverBowler(iplDeliveries);
        }
       catch(error){
           console.error("ERROR:",error.message)
       }
    }  
}
