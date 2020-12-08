const fs = require("fs");

//get data
var data = readandParseData();
//Generate Objects
var passports = [];
data.forEach((passData) => {
    passports.push(parsePassportData(passData))
})
//filter validPassports
var validPassports = filterValidPasses(passports);
var reallyValidPassports = filterValidPassesWithRules(validPassports)

console.log("Tuer 4.1: " + validPassports.length);
console.log("Tuer 4.2: " + reallyValidPassports.length);


// filter the valid data
function filterValidPasses (passports) {
    let validPassports = passports.filter((pass) => {
        if (pass.paramsCount >= 8) {
            return true;
        } else if (pass.paramsCount === 7 && !pass.cid) {
            return true;
        }
    })
    return validPassports;
}

/**
 *
 *
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
 *
 */
function filterValidPassesWithRules (passports) {
    let byrRule = "(^19[2-9][0-9]$)|(^200[0-2]$)";
    let iyrRule = "(^201[0-9]$)|(^2020$)";
    let eyrRule = "(^20[2][0-9])|(^2030)";
    let hgtRule = "((1[5-8][0-9])cm)|((19[0-3])cm)|((59)in)|(([6][0-9])in)|(([7][0-6])in)";
    let hclRule = "(^#([\\d]|[a-f]){6}$)";
    let eclRule = "(^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$)";
    let pidRule = "^[\\d]{9}$";
    //let cidRule="";

    let validPassports = passports.filter((pass) => {
        let test = pass.hcl.toString().match(hclRule)
        if (pass.byr.toString().match(byrRule)
            && pass.iyr.toString().match(iyrRule)
            && pass.eyr.toString().match(eyrRule)
            && pass.hgt.toString().match(hgtRule)
            && pass.hcl.toString().match(hclRule)
            && pass.ecl.toString().match(eclRule)
            && pass.pid.toString().match(pidRule)
        ) {
            return true;
        }
    })

    return validPassports;
}

//create and return Object of Pass with key values and the count of params
function parsePassportData (passEntityData) {
    let pass = [];
    let tmpPassdata = passEntityData.split(" ");
    let tmpMap = new Map();
    let count = 0;
    tmpPassdata.forEach((entry) => {
        let tmp = entry.split(":");
        tmpMap.set(tmp[0], tmp[1]);
        count++;
    });

    tmpMap.set("paramsCount", count);
    return Object.fromEntries(tmpMap);

}

function readandParseData () {
    let data = fs.readFileSync('./tuer4/source.txt', 'utf8').toString().split("\r\n\r\n");
    data = data.map(function (x) { return x.replace(/\r\n/g, " ") });
    return data;
}