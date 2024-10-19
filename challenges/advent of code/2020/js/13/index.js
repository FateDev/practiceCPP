//part 1
function getClosestTime(time, busID){
    return Math.ceil(time/busID)*busID - time;
}

function getData(text){
    text = text.replaceAll("x,", "")
    text = text.split("\n")
    text.pop()
    text[0] = parseInt(text[0])
    text[1] = text[1].split(",").map(num => parseInt(num))
    return text;
}

function goThrough(data){
    let min = -1, minID = 0, lastMin = -2;
    for(const busID of data[1]) {
        if(min == -1){
            min = getClosestTime(data[0], busID);
            minID = busID;
            lastMin = min;
            continue;
        }
        min = Math.min(min, getClosestTime(data[0], busID));
        if(lastMin != min) minID = busID;
        lastMin = min;
    }
    return min*minID;
}

console.log("Part 1: " + goThrough(getData(document.getElementsByTagName("pre")[0].innerText)));

//p2

function part2ans(){ //originally done using an online chinese remainder theorem tool, this is from @gittyhubacc's solution
    function getData(text){
        text = text.split("\n")
        text.pop();
        text = text[1].split(",").map((num, index) => parseInt(num) ? [parseInt(num), index] : "x");
        text = text.filter(item => item != "x")
        return text;
    }
    data = getData(document.getElementsByTagName("pre")[0].innerText)
    part2 = 0
    function step(i){
        p = 1
        for(j = 0; j < i; j++) p *= data[j][0]
        return p
    }
    for(let i = 1; i < data.length; i++){
        _step = step(i)
        while((part2+data[i][1]) % data[i][0]){part2 += _step}
    }
    console.log("Part 2: " + part2);
}
