function getData(text){
    text = text.split("\n");
    text.pop();
    return text;
}

function processP2(instruction, waypoint, userData){
    if(instruction[0] == "F") userData = vector_add_2d(vector_multiply_2d_mag(waypoint, parseInt(instruction.slice(1))), userData)
    if(instruction[0] == "L" || instruction[0] == "R") waypoint = rotateWaypoint(waypoint, instruction.slice(1), instruction[0])
    if(["N", "E", "S", "W"].includes(instruction[0])) waypoint = moveWaypoint(instruction[0], instruction.slice(1), waypoint)
    return [userData, waypoint];
}

function goThroughP2(data){
    let userData = [0, 0];
    let waypoint = [10, 1];
    for(const instruction of data){
        [userData, waypoint] = processP2(instruction, waypoint, userData)
    }
    return Math.abs(userData[0]) + Math.abs(userData[1]);
}

function rotateWaypoint(waypoint, angle, direction){
    let multiplier = direction == "L" ? 1 : -1;
    angle = ((parseInt(angle) % 360) / 90) * Math.PI/2 * multiplier;
    return [Math.round(waypoint[0]*Math.cos(angle) - waypoint[1]*Math.sin(angle)), Math.round(waypoint[0]*Math.sin(angle) + waypoint[1]*Math.cos(angle))];
}

function moveWaypoint(direction, amount, waypoint){
    direction = direction.toLowerCase();
    if(direction == "n") waypoint[1] += parseInt(amount);
    if(direction == "s") waypoint[1] -= parseInt(amount);
    if(direction == "e") waypoint[0] += parseInt(amount);
    if(direction == "w") waypoint[0] -= parseInt(amount);
    return waypoint;
}

const vector_add_2d = (a, b) => [a[0]+b[0], a[1]+b[1]]
const vector_multiply_2d_mag = (a, b) => [a[0]*b, a[1]*b]

function goThrough(data){
    let userData = [0, 0];
    let waypoint = [10, 1];
    for(const instruction of data){
        [userData, waypoint] = processP2(instruction, waypoint, userData)
    }
    return Math.abs(userData[0]) + Math.abs(userData[1]);
}

function goThroughP1(data){
    let userData = { direction: "e", npos: 0, epos: 0 };
    for(const instruction of data){
        userData = process(instruction, userData);
    }
    return Math.abs(userData.epos) + Math.abs(userData.npos);
}

function process(instruction, userData){
    if(instruction[0] == "L" || instruction[0] == "R"){
        const newDir = turn(instruction[0], instruction.slice(1), userData);
        if(newDir == -1) return console.log("BROKEN");
        userData.direction = newDir;
        return userData;
    }
    if(instruction[0] == "F") return move(userData.direction, instruction.slice(1), userData);
    return move(instruction[0], instruction.slice(1), userData);
}

function move(direction, amount, userData){
    direction = direction.toLowerCase();
    if(direction == "n") userData.npos += parseInt(amount);
    if(direction == "s") userData.npos -= parseInt(amount);
    if(direction == "e") userData.epos += parseInt(amount);
    if(direction == "w") userData.epos -= parseInt(amount);
    return userData;
}

function turn(direction, angle, userData){
    const directions = [ "e", "s", "w", "n" ];
    angle = (parseInt(angle) % 360) / 90;
    const currentDirIndex = directions.indexOf(userData.direction);
    if(direction == "R")
        return directions[(currentDirIndex + angle) % 4];
    else if(direction == "L")
        return directions[(currentDirIndex - angle) % 4 >= 0 ? (currentDirIndex - angle) % 4 : (currentDirIndex - angle) % 4 + 4 ];
    else
        return -1;
}

console.log("Part 1: " + goThroughP1(getData(document.getElementsByTagName("pre")[0].innerText)));
console.log("Part 2: " + goThroughP2(getData(document.getElementsByTagName("pre")[0].innerText)));
