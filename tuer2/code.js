const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./tuer2/source.txt'),
    output: process.stdout,
    terminal: false
});

var correctCount = 0;

function numberofValidPass1 (min, max, char, pass) {
    let tmp1 = (pass.split(char)).length - 1;
    let tmp2 = (pass.split(char)).length - 1;
    if (tmp1 >= min && tmp2 <= max) {
        correctCount++;
    }
}

function numberofValidPass2 (pos1, pos2, char, pass) {
    let tmp1 = pass.substr(pos1 - 1, 1);
    let tmp2 = pass.substr(pos2 - 1, 1);
    if ((tmp1 === char & tmp2 !== char)
        || (tmp1 !== char & tmp2 === char)) {
        correctCount++;
    }
}

rl.on('line', (input) => {
    let min = input.substr(0, input.indexOf("-"));
    let max = input.substr(input.indexOf('-') + 1, (input.indexOf(" ") - input.indexOf('-') - 1));
    let char = input.substr(input.indexOf(':') - 1, 1);
    let pass = input.substr(input.indexOf(': ') + 2);

    //console.log(min, max, char, pass)
    numberofValidPass2(min, max, char, pass);
    console.log(correctCount);
});


