const fs = require('fs');


const data = fs.readFile('C:/Users/goodjwon/익스포트.sql', 'utf-8', function(err, data){
    console.log('abc?');
});

console.log('first?');


const dataSync = fs.readFileSync('C:/Users/goodjwon/익스포트.sql', 'utf-8');

console.log('second?');