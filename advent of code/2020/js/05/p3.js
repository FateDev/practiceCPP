var fs = require("fs");
var text = fs.readFileSync("./p3hsbf", "utf-8");
var splitPoint = Math.min(text.indexOf("L"), text.indexOf("R"))
var seatLength = text.indexOf("\n")
var input=text.split("\n").map(seat => [seat.substr(0, splitPoint), seat.substr(splitPoint, seatLength)])
input.pop()
function binary_search(pass, topCode, bottomCode, top, bottom){
    if(pass == "") {
        return Math.min(top, bottom);
    }
    let code = pass[0];
    if(code == topCode) return binary_search(pass.substr(1), topCode, bottomCode, top, bottom + (top - bottom + 1)/2);
    if(code == bottomCode) return binary_search(pass.substr(1), topCode, bottomCode, top - (top - bottom + 1)/2, bottom);
}
function find_seat(seat){
    const row = binary_search(seat[0], "B", "F", (1 << splitPoint) - 1, 0);
    const column = binary_search(seat[1], "R", "L", (1 << (seatLength-splitPoint)) - 1, 0);
    return [row, column];
}
let maximum_id = 0;
for(const seat of input){
    const [row, column] = find_seat(seat);
    maximum_id = Math.max(maximum_id, row*(1 << (seatLength-splitPoint)) + column);
}
console.log("Maximum ID: ", maximum_id);

empty_array = []
for(let i = 0; i < (1 << seatLength); i++) empty_array[i] = false;
for(const seat of input){
    const [row, column] = find_seat(seat);
    empty_array[row*(1 << (seatLength-splitPoint)) + column] = true;
}
i = (1 << seatLength);
while(!empty_array[--i]);
j = -1;
while(!empty_array[++j]);
empty_array = empty_array.slice(j, i+1);
k = 0;
let free_seats = [];
for(let l = 0; l < i-j; l++){
    if(!empty_array[l]) free_seats.push(j+l);
}
console.log("All free seats: ", free_seats);
