// Top 10 economical bowlers in the year 2015
const parse = require('csv-parse');
const fs = require('fs');
const _=require('underscore');

const IPLdeliveries = [];
fs.createReadStream(__dirname + '/../src/data/deliveries.csv').pipe(
    parse({
        delimiter: ',',
        columns: true,
        trim: true
    })
)
    .on('data', function (record) {
        IPLdeliveries.push(record)
    })
    .on('end', function () {
        //console.log(IPLdeliveries);
        matches();
    })
   


const IPLmatches = [];

function matches(){
    fs.createReadStream(__dirname + '/../src/data/matches.csv').pipe(
        parse({
            delimiter: ',',
            columns: true,
            trim: true
        })
    )
        .on('data', function (record) {
            IPLmatches.push(record)
        })
        .on('end', function () {
            economicalBowler(IPLmatches, IPLdeliveries);
        })
    
}

function economicalBowler(IPLmatches, IPLdeliveries) {
   let bowlersScore=[];
   let bowlerOver=[];
    let min = Infinity;
    let max = -Infinity;
    
    IPLmatches.forEach(IPL2015);
    IPLdeliveries.forEach(bowlerNames);
    IPLdeliveries.forEach(eco_Bowler);

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

    function bowlerNames(record) {
        if(record.match_id >= min && record.match_id<=max){
            bowlersScore[record.bowler]=0;
            bowlerOver[record.bowler]={over:0,pre:0};

         }
    }
    function eco_Bowler(record) {
        if(record.match_id >= min && record.match_id<=max){  
            bowlersScore[record.bowler]+=(+record.total_runs);
            if(bowlerOver[record.bowler].pre != record.over){
                bowlerOver[record.bowler].over+=1;
                bowlerOver[record.bowler].pre= +record.over;
            }
        }
    }
   //console.log(bowlerOver);
    let final=[];
    for(let item in bowlersScore){
        const avgScore=bowlersScore[item]/bowlerOver[item].over;
        final.push({bowler:item, avgRun:avgScore, over:bowlerOver[item].over});
    }
    final=_.sortBy(final,'avgRun')
    const top10Bowler=[];
    for(let i=0;i<10;i++){
        top10Bowler.push(final[i]);
    }


    tranferToJSON(JSON.stringify(top10Bowler));
}

function tranferToJSON(data) {
    fs.writeFile('../src/public/output/economicalBowler.json', data, err => {
        if (err) throw err;
    })
}