//commented out array 2d lines are for use on input page with console

var fs = require("fs");
var text = fs.readFileSync("./p3hsbf", "utf-8");
const array2d = text.split("\n").map(row => row.split(""))

//day 3 part 1

//array2d=document.getElementsByTagName("pre")[0].innerText.split("\n").map(row => row.split(""))
length=array2d[0].length
userInfo=[0,0,0] //of the form: x, y, number of trees
for(let i = 0; i < array2d.length;i++){
    if(array2d[userInfo[1]][userInfo[0]] == "#") userInfo[2]++;
    userInfo[1]++;
    userInfo[0]=(userInfo[0]+3)%length;
}
console.log(userInfo[2])


//day 3 part 2

//array2d=document.getElementsByTagName("pre")[0].innerText.split("\n").map(row => row.split(""))
function goDown(slopeX, slopeY, array2d){
    let length = array2d[0].length;
    let userInfo=[0,0,0] //of the form: x, y, number of trees
    for(let i = 0; i < array2d.length;i++){
        if(!array2d[userInfo[1]]) break;
        if(array2d[userInfo[1]][userInfo[0]] == "#") userInfo[2]++;
        userInfo[1]+=slopeY;
        userInfo[0]=(userInfo[0]+slopeX)%length;
    }
    return userInfo[2];
}
slopes=[ [1, 1], [3, 1], [5, 1], [7, 1], [1, 2] ]
slopes=slopes.map(slope => goDown(...slope, array2d))
console.log(slopes.reduce((sum, current) => sum*=parseInt(current), 1))
