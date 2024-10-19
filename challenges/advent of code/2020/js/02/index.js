//To be executed on the day 2 data page if using the commented out array lines

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
const array = text.split("\n");

//day 2 part 1

//array=document.getElementsByTagName("pre")[0].innerText.split("\n")
rulePassPair=array.map(item => item.split(":"))
rulePassPair.forEach(item => item[0] = item[0].split(" "))
rulePassPair.forEach(item => item[0][0] = item[0][0].split("-").map(number => parseInt(number)))
rulePassPair.pop();
let valid = 0;
function instancesOf(letter, string){
    return [...string.matchAll(new RegExp(letter, "g"))].length;
}
function withinBounds(i, l, u){
    return i <= u && i >= l;
}
for(item of rulePassPair){
    let count = instancesOf(item[0][1], item[1]);
    if(withinBounds(count, item[0][0][0], item[0][0][1])) valid++;
}
console.log(valid);


//day 2 part 2

//array=document.getElementsByTagName("pre")[0].innerText.split("\n")
rulePassPair=array.map(item => item.split(":"))
rulePassPair.forEach(item => item[0] = item[0].split(" "))
rulePassPair.forEach(item => item[0][0] = item[0][0].split("-").map(number => parseInt(number)))
rulePassPair.pop();
let valid = 0;
function instancesOf(letter, string){
    return [...string.matchAll(new RegExp(letter, "g"))].length;
}
function testValid(pos1, pos2, letter, string){
    let atPos1 = string[pos1] == letter;
    let atPos2 = string[pos2] == letter;
    return atPos1 ^ atPos2;
}
for(item of rulePassPair){
    if(testValid(item[0][0][0], item[0][0][1], item[0][1], item[1])) valid++;
}
console.log(valid);
