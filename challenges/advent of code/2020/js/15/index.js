function go_through(starting, lastTurn){
    const numMap = [];
    let lastNum = starting[starting.length-1];
    for(let i = 0; i < starting.length-1; i++){
        numMap[starting[i]] = i+1;
    }
    for(let i = starting.length-1; i < lastTurn-1; i++){
        if(numMap[lastNum] == undefined){
            numMap[lastNum] = i+1;
            lastNum = 0;
        }else{
            let lastPos = numMap[lastNum];
            numMap[lastNum] = i+1;
            lastNum = i+1 - lastPos;
        }
    }
    return lastNum;
}

go_through([9,6,0,10,18,2,1], 2020)
go_through([9,6,0,10,18,2,1], 30000000)
