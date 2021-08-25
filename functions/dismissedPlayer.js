// Find the highest number of times one player has been dismissed by another player
/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet
 */

const dataSheet=require('./extraction');
const path='/../src/data/deliveries.csv';
dataSheet.fetching(path,dismissedPlayer);

/**
 * Finding table top dismissed player 
 * @function dismissedPlayer
 * @param {Array} IPLrecords - Record of all balls in IPL
 * @property {Object} dismiss - count number of dimission per player
 * @property {Array} dismissPlayer - organising the dismiss into array 
 * @property {String} outputPath - path to dump the output 
 */
function dismissedPlayer(IPLrecords){
    const dismiss={};
    const dismissPlayer=[];
   IPLrecords.reduce(countDismiss);

   /**
    * function to count the dismissed per player
    * @function countDismiss 
    * @param {object} tot - accummulation of dismissed player 
    * @param {object} records - records of each ball
    * @returns {object} - number of dimission per player
    */
    function countDismiss(tot,records){
        if(records.player_dismissed != ''){
            dismiss[records.player_dismissed]=dismiss[records.player_dismissed]??0;
            dismiss[records.player_dismissed]+=+1;
        }
        return dismiss;
    }
    for(let element in dismiss){
        dismissPlayer.push({Player:element,count:dismiss[element]});
    }
    dismissPlayer.sort((a,b)=>{return b.count - a.count})

    const outputPath='../src/public/output/dismissedPlayer.json';
    dataSheet.tranferToJSON(JSON.stringify(dismissPlayer.shift()),outputPath);
}
