function getData(text){
    text = text.split("\n");
    text.pop();
    text = text.map(row => row.split(""))
    return text;
}

function updateConverge(data){
    const originalData = data.map(rows => rows.slice())

    let changes = 0;
    do{
        [changes,data]=update(data, false)
    }while(changes)
    
    let occupied = 0;
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].length; j++){
            if(data[i][j] == "#") occupied++;
        }
    }

    data = originalData

    changes = 0;
    do{
        [changes,data]=update(data, true)
    }while(changes)
    
    let occupiedP2 = 0;
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].length; j++){
            if(data[i][j] == "#") occupiedP2++;
        }
    }

    return [occupied,occupiedP2];
}
function adjacentOccupied(data, row, col){
    let occupied = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(i == 0 && j == 0) continue;
            if(data?.[row+i]?.[col+j] == "#") occupied++;
        }
    }
    return occupied;
}
function update(data, part2){
    const columns = data[0].length;
    const rows = data.length;

    let changes = 0;

    const updatedData = [];
    for(let i = 0; i < rows; i++) updatedData.push(new Array(columns));

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            updatedData[i][j] = data[i][j];
            const occupied = part2 ? occupiedInSight(data, i, j) : adjacentOccupied(data, i, j);
            if(data[i][j] == "L"){
                if(occupied == 0) { updatedData[i][j] = "#"; changes++; }
            }else if(data[i][j] == "#"){
                if((occupied >= 5 && part2) || (occupied >= 4 && !part2)) { updatedData[i][j] = "L"; changes++; }
            }
        }
    }
    return [changes,updatedData];
}
function occupiedInSight(data, row, col){
    const directionsVisited = [ [ -1, -1, -1 ], [ -1, 2, -1 ], [ -1, -1, -1 ] ]; //-1 means unvisited, 0 means occupied, 1 means unoccupied, 2 is the starting seat
    const maxIter = Math.max(Math.max(Math.max(data.length - row, data[0].length - col), row), col); //the maximum amount to go in any direction
    for(let i = 1; i < maxIter; i++){
        if(data?.[row]?.[col+i] == "#" && directionsVisited[1][2] == -1) directionsVisited[1][2] = 0;
        if(data?.[row]?.[col-i] == "#" && directionsVisited[1][0] == -1) directionsVisited[1][0] = 0;
        if(data?.[row+i]?.[col] == "#" && directionsVisited[2][1] == -1) directionsVisited[2][1] = 0;
        if(data?.[row-i]?.[col] == "#" && directionsVisited[0][1] == -1) directionsVisited[0][1] = 0;
        if(data?.[row+i]?.[col+i] == "#" && directionsVisited[2][2] == -1) directionsVisited[2][2] = 0;
        if(data?.[row-i]?.[col-i] == "#" && directionsVisited[0][0] == -1) directionsVisited[0][0] = 0;
        if(data?.[row+i]?.[col-i] == "#" && directionsVisited[2][0] == -1) directionsVisited[2][0] = 0;
        if(data?.[row-i]?.[col+i] == "#" && directionsVisited[0][2] == -1) directionsVisited[0][2] = 0;

        if(data?.[row]?.[col+i] == "L" && directionsVisited[1][2] == -1) directionsVisited[1][2] = 1;
        if(data?.[row]?.[col-i] == "L" && directionsVisited[1][0] == -1) directionsVisited[1][0] = 1;
        if(data?.[row+i]?.[col] == "L" && directionsVisited[2][1] == -1) directionsVisited[2][1] = 1;
        if(data?.[row-i]?.[col] == "L" && directionsVisited[0][1] == -1) directionsVisited[0][1] = 1;
        if(data?.[row+i]?.[col+i] == "L" && directionsVisited[2][2] == -1) directionsVisited[2][2] = 1;
        if(data?.[row-i]?.[col-i] == "L" && directionsVisited[0][0] == -1) directionsVisited[0][0] = 1;
        if(data?.[row+i]?.[col-i] == "L" && directionsVisited[2][0] == -1) directionsVisited[2][0] = 1;
        if(data?.[row-i]?.[col+i] == "L" && directionsVisited[0][2] == -1) directionsVisited[0][2] = 1;
    }
    let occupied = 0;
    for(let i = 0 ; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(directionsVisited[i][j] == 0) occupied++;
        }
    }
    return occupied;
}
const [p1, p2] = updateConverge(getData(document.getElementsByTagName("pre")[0].innerText))
console.log("Part 1: ", p1)
console.log("Part 2: ", p2)
