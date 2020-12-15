const fs = require("fs").promises;

const readEntries = async () => {
    const data = await fs.readFile("./day6/source.txt", "utf8");
    return data.split("\r\n\r\n");
};

const solveOne = async () => {
    const groups = await readEntries();
    let unicYesAnswersPerGroup = 0;
    for (group of groups) {
        group = group.split(/\r\n/g);
        let groupSet = new Set();
        for (user of group) {
            for (answers of user) {
                groupSet.add(answers);
            }

        }
        //console.log("Group: " + group + ": " + groupSet.size);
        unicYesAnswersPerGroup += groupSet.size;
    }
    return unicYesAnswersPerGroup;
};


const solveTwo = async () => {
    const groups = await readEntries();
    let unicYesAnswersPerGroup = 0;
    for (let group of groups) {
        group = group.split(/\r\n/g);
        let groupSet = new Set(group[0]);
        for (let user of group) {
            groupSet = intersection(groupSet, new Set(user));
        }
        unicYesAnswersPerGroup += groupSet.size;
    }
    return unicYesAnswersPerGroup;
};

function intersection (set1, set2) {
    let intersectionOnes = new Set();
    for (let setChar of set2) {
        if (set1.has(setChar)) {
            intersectionOnes.add(setChar);
        } else {

        }
    }
    return intersectionOnes;
}


const solveTwoTwo = async () => {
    const groups = await readEntries();
    let unicYesAnswersPerGroup = 0;
    for (let group of groups) {
        group = group.split(/\r\n/g);
        let groupSet = new Set(group[0]);
        if (group.length > 1) {
            let strGroup = group.toString().replace(/\,/g, "");
            let groupCHars = strGroup.split('');
            //console.log(groupCHars);
            const findDuplicates = groupCHars => groupCHars.filter((item, index) => groupCHars.indexOf(item) !== index)
            const duplicates = findDuplicates(groupCHars);
            // console.log("Dups:" + duplicates);
            let tmp = duplicates.toString().replace(/\,/g, "");
            groupSet = new Set(tmp);
        }
        // console.log("Set: ", groupSet);
        unicYesAnswersPerGroup += groupSet.size;
    }

    return unicYesAnswersPerGroup;
}




solveOne().then((result) => {
    console.log("1: " + result);
});

solveTwo().then((result) => {
    console.log("2a: " + result);
});

solveTwoTwo().then((result) => {
    console.log("2b: " + result);
});


function test () {
    let data = ["ab", "ac", "fd", "ab"];

    let strGroup = data.toString().replace(/\,/g, "");
    let groupCHars = strGroup.split('');
    console.log(groupCHars);
    const findDuplicates = groupCHars => groupCHars.filter((item, index) => groupCHars.indexOf(item) !== index)
    const duplicates = findDuplicates(groupCHars);
    console.log(new Set(duplicates));


}