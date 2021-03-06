//commented out array lines are for use on input page, in the console

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
const input = text.split("\n\n").map(group => group.replaceAll("\n", ""));

//day 6 part 1

//input=document.getElementsByTagName("pre")[0].innerText.split("\n\n").map(group => group.replaceAll("\n", ""))
total = 0;
for(const group of input){
    const group_set = new Set();
    for(const question of group.split("")){
        group_set.add(question);
    }
    total += group_set.size
}


//day 6 part 2

function find_yes(input){
    let total = 0;
    for(const group of input){
        const group_object = {};
        for(const person of group){
            for(const question of person.split("")){
                if(!group_object[question]) group_object[question] = 0;
                group_object[question]++;
            }
        }
        let local_increase = 0;
        for(const pair of Object.entries(group_object)){
            if(pair[1] == group.length){
                total++;
            }
        }
    }
    return total;
}

const process_data = (data) => {
    const returnData = data.split("\n\n").map(group => group.split("\n"));
    returnData[returnData.length-1].pop();
    return returnData;
}

//find_yes(process_data(document.getElementsByTagName("pre")[0].innerText))
find_yes(process_data(text))
