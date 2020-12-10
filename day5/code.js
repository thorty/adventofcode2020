const fs = require("fs");

//get data
var data = readandParseData();
console.log(data);

let idsMap = [];

console.log("Day 5.1: " + calcHighestSeat(data));
console.log("Day 5.2: " + calcMySeat(data));

function calcMySeat (data) {

    let freeSeats = [];
    //sort
    let sortIds = idsMap.sort((a, b) => {
        return a - b;
    })

    //calc frea seats
    for (i = 0; i <= sortIds.length; i++) {
        let temp1 = sortIds[i];
        let temp3 = sortIds[i + 1]

        if (temp3 - temp1 === 2) {
            //console.log(sortIds[i] + 1);
            freeSeats.push(sortIds[i] + 1);
        }
    }
    return freeSeats;
}



function calcHighestSeat (data) {
    let highestId = 0;
    data.forEach(element => {
        let id = getID(element);
        idsMap.push(id);
        if (id > highestId) {
            highestId = id;
        }
    });
    return highestId;
}


function getID (data) {
    const seatsMap = createSeatsMap();
    let seatArr = data.split('');
    let seatRowNr = 0;
    //row
    for (i = 0; i < 8; i++) {
        if (seatArr[i - 1] === 'B') {
            seatRowNr += seatsMap[i - 1];
        }
    }
    //col
    let seatColNr = 0;
    for (i = 7; i < 11; i++) {
        if (seatArr[i - 1] === 'R') {
            seatColNr += seatsMap[i - 1];
        }
    }

    let id = (seatRowNr * 8) + seatColNr;


    console.log("row: " + seatRowNr + " col: " + seatColNr + " id: " + id);

    return id;
}




function createSeatsMap () {
    let target = 127;
    let rowsMap = [];
    while (target > 0) {
        target = Math.trunc(target / 2)
        //Sconsole.log(target + 1);
        rowsMap.push(target + 1)
    }

    let targetC = 7;
    while (targetC > 0) {
        targetC = Math.trunc(targetC / 2)
        //console.log(target + 1);
        rowsMap.push(targetC + 1)
    }
    return rowsMap;
}

function readandParseData () {
    let data = fs.readFileSync('./day5/source.txt', 'utf8').toString().split("\r\n");
    //data = data.map(function (x) { return x.replace(/\r\n/g, " ") });
    return data;
}

