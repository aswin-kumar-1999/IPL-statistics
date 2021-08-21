// Find a player who has won the highest number of Player of the Match awards for each season
const dataSheet = require('./extraction');

const path = '/../src/data/matches.csv';
dataSheet.fetching(path, playerOfMatch);

function playerOfMatch(IPLmatch) {
    const MAN_OF_THE_MATCH = {};
    IPLmatch.reduce(manOfTheMatch);

    function manOfTheMatch(tot, match) {

        MAN_OF_THE_MATCH[match.player_of_match] = MAN_OF_THE_MATCH[match.player_of_match] ?? 0;
        MAN_OF_THE_MATCH[match.player_of_match] += 1
        return MAN_OF_THE_MATCH;
    }
    const manOfMatch = [];
    for (let i in MAN_OF_THE_MATCH) {
        manOfMatch.push({ name: i, count: MAN_OF_THE_MATCH[i] });
    }
    manOfMatch.sort((a, b) => { return b.count - a.count });
    const outputPath='../src/public/output/playerOfMatch.json';
    dataSheet.tranferToJSON(JSON.stringify(manOfMatch.shift()),outputPath);
}
