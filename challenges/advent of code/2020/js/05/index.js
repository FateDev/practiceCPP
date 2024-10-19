//commented out array lines are for use on input page with console

var fs = require("fs");
var text = fs.readFileSync("./p3hsbf", "utf-8");
const input = text.split("\n").map(seat => [seat.substr(0, 7), seat.substr(7, 10)])
input.pop()

//day 5 part 1

//input=document.getElementsByTagName("pre")[0].innerText.split("\n").map(seat => [seat.substr(0, 7), seat.substr(7, 10)])
//input.pop()
function binary_search(pass, topCode, bottomCode, top, bottom){
    if(pass == "") {
        return Math.min(top, bottom);
    }
    let code = pass[0];
    if(code == topCode) return binary_search(pass.substr(1), topCode, bottomCode, top, bottom + (top - bottom + 1)/2);
    if(code == bottomCode) return binary_search(pass.substr(1), topCode, bottomCode, top - (top - bottom + 1)/2, bottom);
}
function find_seat(seat){
    const row = binary_search(seat[0], "B", "F", 127, 0);
    const column = binary_search(seat[1], "R", "L", 7, 0);
    return [row, column];
}
let maximum_id = 0;
for(const seat of input){
    const [row, column] = find_seat(seat);
    maximum_id = Math.max(maximum_id, row*8 + column);
}


//day 5 part 2

empty_array = []
for(let i = 0; i < 1024; i++) empty_array[i] = false;
//input=document.getElementsByTagName("pre")[0].innerText.split("\n").map(seat => [seat.substr(0, 7), seat.substr(7, 10)])
//input.pop()
function binary_search(pass, topCode, bottomCode, top, bottom){
    if(pass == "") {
        return Math.min(top, bottom);
    }
    let code = pass[0];
    if(code == topCode) return binary_search(pass.substr(1), topCode, bottomCode, top, bottom + (top - bottom + 1)/2);
    if(code == bottomCode) return binary_search(pass.substr(1), topCode, bottomCode, top - (top - bottom + 1)/2, bottom);
}
function find_seat(seat){
    const row = binary_search(seat[0], "B", "F", 127, 0);
    const column = binary_search(seat[1], "R", "L", 7, 0);
    return [row, column];
}
for(const seat of input){
    const [row, column] = find_seat(seat);
    empty_array[row*8 + column] = true;
}
i = 1024;
while(!empty_array[--i]);
j = -1;
while(!empty_array[++j]);
empty_array = empty_array.slice(j, i+1);
k = 0;
while(empty_array[++k]);
console.log(k+j)
