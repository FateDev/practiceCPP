//commented out data lines are for use on input page with console

var fs = require("fs");
var text = fs.readFileSync("./p3hsbf", "utf-8");
const data = text.split("\n\n").map(item => item.replaceAll("\n", " ").split(" ").map(detail => detail.split(":")))

//day 4 part 1

//data=document.getElementsByTagName("pre")[0].innerText.split("\n\n").map(item => item.replaceAll("\n", " ").split(" ").map(detail => detail.split(":")))
validFields = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"])
function validate(item){
    let requiredCount = 0;
    for(const data of item){
        if(validFields.has(data[0])) requiredCount++;
    }
    if(requiredCount == 7) return true;
    return false;
}
validPassports = 0;
for(const item of data){
    if(validate(item)) validPassports++;
}
console.log(validPassports)


//day 4 part 2

//data=document.getElementsByTagName("pre")[0].innerText.split("\n\n").map(item => item.replaceAll("\n", " ").split(" ").map(detail => detail.split(":")))
validFields = new Set(["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"])
function validate(item){
    let requiredCount = 0;
    for(const data of item){
        if(validFields.has(data[0])){
            switch(data[0]){
            case "byr":
                if(parseInt(data[1]) >= 1920 && parseInt(data[1]) <= 2002) requiredCount++; break;
            case "iyr":
                if(parseInt(data[1]) >= 2010 && parseInt(data[1]) <= 2020) requiredCount++; break;
            case "eyr":
                if(parseInt(data[1]) >= 2020 && parseInt(data[1]) <= 2030) requiredCount++; break;
            case "hgt":
                if(data[1].indexOf("cm") !== -1){
                    let height = parseInt(data[1].replaceAll("cm", ""));
                    if(height >= 150 && height <= 193) requiredCount++;
                } else if(data[1].indexOf("in") !== -1){
                    let height = parseInt(data[1].replaceAll("in", ""));
                    if(height >= 59 && height <= 76) requiredCount++;
                }
                break;
            case "hcl":
                if(data[1].search(/#[0-9a-f]{6}/) !== -1 && data[1].length == 7) requiredCount++; break;
            case "ecl":
                if(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(data[1])) requiredCount++; break;
            case "pid":
                if(data[1].search(/[0-9]{9}/) !== -1 && data[1].length == 9) requiredCount++; break;
            }
        }
    }
    if(requiredCount == 7) return true;
    return false;
}
validPassports = 0;
for(const item of data){
    if(validate(item)) validPassports++;
}
console.log(validPassports)
