//Find the number of times each team won the toss and also won the match
const dataSheet = require('./extraction');

const path = '/../src/data/matches.csv';
dataSheet.fetching(path, wonTossMatch);

function wonTossMatch(IPLmatches) {
    const tossMatchWin = {};
    IPLmatches.reduce(winingAll);

    function winingAll(tot, team) {
        if (team.toss_winner === team.winner) {
            tossMatchWin[team.winner] = tossMatchWin[team.winner] ?? 0;
            tossMatchWin[team.winner] += 1;
        }
        return tossMatchWin;
    }

    //console.log(tossMatchWin);
    const outputPath='../src/public/output/wonTossMatch.json';
    dataSheet.tranferToJSON(JSON.stringify(tossMatchWin),outputPath);
}
