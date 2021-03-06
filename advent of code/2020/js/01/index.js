//With commented out array lines, can execute on input page in console

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");
const array = text.split("\n")


//day 1 part 1

//array=document.getElementsByTagName("pre")[0].innerText.split("\n")
for(i = 0; i < array.length;i++){
    for(j = 0; j < array.length;j++){
        if(parseInt(array[i])+parseInt(array[j])==2020) console.log(parseInt(array[i])*parseInt(array[j]));
    }
}



//day 1 part 2

//array=document.getElementsByTagName("pre")[0].innerText.split("\n")
for(i = 0; i < array.length;i++){
    for(j = 0; j < array.length;j++){
        for(k = 0; k < array.length;k++){
            if(parseInt(array[i])+parseInt(array[j])+parseInt(array[k])==2020) console.log(parseInt(array[i])*parseInt(array[j])*parseInt(array[k]));
        }
    }
}
