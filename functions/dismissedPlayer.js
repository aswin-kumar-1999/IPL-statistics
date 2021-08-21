// Find the highest number of times one player has been dismissed by another player

const dataSheet=require('./extraction');
const path='/../src/data/deliveries.csv';
dataSheet.fetching(path,dismissedPlayer);

function dismissedPlayer(IPLrecords){
    const dismiss={};
    const dismissPlayer=[];
   IPLrecords.reduce(countDismiss);

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
