// Top 10 economical bowlers in the year 2015

/**
 * Fetching the data from matches.csv and deliveries.csv files
 * @requires  module:'functions/extraction.js'
 * @property {String} path - path of file from which data has to be fetched 
 * @member dataSheet
 */

const dataSheet=require('./extraction');
function top10EconomicBowler(IPLmatches, IPLdeliveries){
    let bowlersScore=[];
    let bowlerOver=[];
     let min = Infinity;
     let max = -Infinity;
     
     IPLmatches.forEach(IPL2015);
     IPLdeliveries.forEach(bowlerNames);
     IPLdeliveries.forEach(eco_Bowler);
 
    /**
     * Find the starting and ending match ID
     * @function IPL2015
     * @param {Object} records - details of each match 
     */
 
     function IPL2015(records) {
         if (records.season == 2015) {
             if (min > records.id) {
                 min = records.id;
             }
             if (max < records.id) {
                 max = records.id;
             }
         }
     }
 
     /**
      * Finding bowler bowled per season
      * @function bowlerNames
      * @param {Object} record - details of each ball in IPL 
      */
 
     function bowlerNames(record) {
         if(record.match_id >= min && record.match_id<=max){
             bowlersScore[record.bowler]=0;
             bowlerOver[record.bowler]={over:0,pre:0};
 
          }
     }
 
     /**
      * finding run given by bowler per season and number of over bowled
      * @function eco_Bowler 
      * @param {Object} record - details of each ball in IPL 
      */
     function eco_Bowler(record) {
         if(record.match_id >= min && record.match_id<=max){  
             bowlersScore[record.bowler]+=(+record.total_runs);
             if(bowlerOver[record.bowler].pre != record.over){
                 bowlerOver[record.bowler].over+=1;
                 bowlerOver[record.bowler].pre= +record.over;
             }
         }
     }


     let final=[];
     for(let item in bowlersScore){
         const avgScore=bowlersScore[item]/bowlerOver[item].over;
         final.push({bowler:item, avgRun:avgScore, over:bowlerOver[item].over});
     }
     // final=_.sortBy(final,'avgRun')
     final.sort((a,b)=>{return a.avgRun-b.avgRun});
     const top10Bowler=[];
     for(let i=0;i<10;i++){
         top10Bowler.push(final[i]);
     }
     const outputPath='../public/output/economicalBowler.json'
     dataSheet.tranferToJSON(JSON.stringify(top10Bowler),outputPath);
}


/**
 * Finding the economical bowler for each season
 * @function top10EconomicBowler
 * @param {Array} IPLmatches  - Records of matches per season
 * @param {Array} IPLdeliveries - Records of all the ball per match
 * @property {Array} bowlersScore - bowler with there score
 * @property {Array} bowlerOver - number of over bowled per bowler
 * @property {number} min - Staring match ID of that season
 * @property {number} max - Ending match ID of that season 
 */


module.exports=top10EconomicBowler;