const fs = require('fs');

var lines = fs.readFileSync('./tuer3/source.txt').toString().split("\n");

var rows = [];

for (let line of lines) {
    line = line.replace('\r', '')
    var row = [];
    for (let char of line) {
        if (char === '#') {
            row.push(true);
        } else {
            row.push(false);
        }
    }
    rows.push(row);
}

function countTrees (x, y) {
    let mx = x;
    let my = y;
    let width = rows[0].length;
    let trees = 0;


    while (y < rows.length) {
        print(rows[y], x % width);
        if (rows[y][x % width]) {
            trees++;
        }
        x += mx;
        y += my

    }

    console.log(trees);
    return trees;
}



function print (row, x) {
    let printRow = [];
    for (i = 0; i < row.length; i++) {

        if (row[i] && i === x) {
            printRow.push("X");
        } else if (!row[i] && i === x) {
            printRow.push("O");
        } else if (row[i]) {
            printRow.push("#");
        } else if (!row[i]) {
            printRow.push(".");
        }
    }
    console.warn((printRow.toString()).replace(/,/g, ''));

}
console.log("## Step 1:");
countTrees(3, 1);
console.log("");
console.log("");
console.log("");
console.log("## Step 2:");
console.log("");
let sum = countTrees(1, 1) * countTrees2(3, 1) * countTrees2(5, 1) * countTrees2(7, 1) * countTrees2(1, 2);
console.log("-------------")
console.error(sum);