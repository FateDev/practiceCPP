var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

function getData(){
    //const text = document.getElementsByTagName("pre")[0].innerText;
    const data = text.split("\n");
    data.pop();
    return data.map(instruction => {
        const processed = instruction.split(" ");
        return [ processed[0], parseInt(processed[1]) ];
    });
}

//p1

function goThroughP1(data){
    let accumulator = 0;
    let visited = new Set();
    for(let i = 0; i < data.length; i++){
        if(visited.has(i)) break;
        visited.add(i);
        const instruction = data[i];
        switch(instruction[0]){
            case "jmp":
                i += instruction[1]-1;
                break;
            case "acc":
                accumulator += instruction[1];
                break;
            default:
                break;
        }
    }
    return accumulator;
}

console.log("Accumulator before the infinite loop: " + goThroughP1(getData()));


//p2

function getData1(text){
    const data = text.split("\n");
    data.pop();
    return data.map(instruction => {
        const processed = instruction.split(" ");
        return [ processed[0], parseInt(processed[1]) ];
    });
}

function goThrough1(data){
    let accumulator = 0;
    let visited = new Set();
    let lastVisitedNoopOrJump = new Array();

    for(let i = 0; i < data.length; i++){
        const instruction = data[i];
        switch(instruction[0]){
            case "jmp":
                lastVisitedNoopOrJump.push(i);
                i += instruction[1]-1;
                break;
            case "acc":
                accumulator += instruction[1];
                break;
            case "nop":
                lastVisitedNoopOrJump.push(i);
                break;
            default:
                break;
        }

        if(visited.has(i)) break;
        visited.add(i);
    }

    while(1){
        let lastVisited = lastVisitedNoopOrJump.pop();
        data[lastVisited][0] = data[lastVisited][0] == "jmp" ? "nop" : "jmp";
        let returnData = goThroughEvaluate(data, lastVisited);
        if(returnData) return goThroughGetAccumulator(data);
        data[lastVisited][0] = data[lastVisited][0] == "jmp" ? "nop" : "jmp";
    }
}

function goThroughEvaluate(data, start = 0){
    let visited = new Set();
    for(let i = start; i < data.length; i++){
        if(visited.has(i)) return false;
        visited.add(i);
        const instruction = data[i];
        switch(instruction[0]){
            case "jmp":
                i += instruction[1]-1;
                break;
            default:
                break;
        }
    }
    return true;
}

function goThroughGetAccumulator(data){
    let accumulator = 0;
    for(let i = 0; i < data.length; i++){
        const instruction = data[i];
        switch(instruction[0]){
            case "jmp":
                i += instruction[1]-1;
                break;
            case "acc":
                accumulator += instruction[1];
                break;
            default:
                break;
        }
    }
    return accumulator;
}

console.log("Corrected program output: " + goThrough1(getData1(text)));
//console.log("Corrected program output: " + goThrough1(getData1(document.getElementsByTagName("pre")[0].innerText)));
