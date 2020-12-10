const fs = require("fs");

var array = fs.readFileSync('./tuer1/source.txt').toString().split("\n");
var result1;
var result2;
var result3;


findDigitisforSum(3, 2020);

function findTwo () {
    for (i = 0; i < array.length - 1; i++) {
        for (ii = i + 1; ii < array.length; ii++) {
            result1 = Number.parseInt(array[i])
            result2 = Number.parseInt(array[ii])
            let sum = result1 + result2;
            //console.log(result1 + "+" + result2 + "=" + sum)
            if (sum === 2020) {
                console.log("Result= " + result1 * result2);
                break;
            }

        }
    }
}

function findthre () {
    for (i = 0; i < array.length - 1; i++) {
        for (ii = i + 1; ii < array.length; ii++) {
            for (iii = ii + 1; iii < array.length; iii++) {
                result1 = Number.parseInt(array[i])
                result2 = Number.parseInt(array[ii])
                result3 = Number.parseInt(array[iii])
                let sum = result1 + result2 + result3;
                //console.log(result1 + "+" + result2 + "=" + sum)
                if (sum === 2020) {
                    console.log("Result= " + result1 * result2 * result3);
                    break;
                }

            }
        }
    }
}


function findDigitisforSum (digitCount, targetSum) {

    let digitArray = [];

    array.forEach((strVal) => {
        digitArray.push(Number.parseInt(strVal));
    })

    let result = 0;
    let sum = 0;
    let pointer = 0;
    while (sum !== targetSum & (pointer - digitCount) < digitArray.length - digitCount) {
        sum = 0;
        let calcArr = digitArray.splice(pointer, digitCount);
        for (i = 0; i < calcArr.length; i++) {
            sum = sum + calcArr[i];
            result = result * calcArr[i];
            break;
        }
        pointer++;
    }
    console.log(result);

}

