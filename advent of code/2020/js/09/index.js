// p1

function getData(){
    const text = document.getElementsByTagName("pre")[0].innerText;
    const data = text.split("\n");
    data.pop();
    return data.map(number => parseInt(number))
}

function isOfLast25(data, start, number){
    let stop = start - 25 > 0 ? start - 25 : 0;
    for(let i = start; i >= stop; i--){
        for(let j = start; j >= stop; j--){
            if(data[i]+data[j] == number) return true;
        }
    }
    return false;
}

function goThrough(data){
    for(let i = 25; i < data.length; i++){
        if(!isOfLast25(data, i, data[i])) return data[i];
    }
}

console.log("Part 1 answer: " + goThrough(getData()));

// p2

function goThrough1(data){
    for(let i = 25; i < data.length; i++){
        if(!isOfLast25(data, i, data[i])) return [data, data[i]];
    }
}

function goThroughContiguous(data){
    let [inputData, number] = data;
    for(let i = 0; i < inputData.length; i++){
        let [start, end] = findContiguous(inputData, i, number);
        if(start >= 0 && end >= 0) return start+end;
    }
}

function findContiguous(data, start, number){
    let sum = 0;
    let smallest = 0;
    let largest = 0;
    for(let i = start;;i++){
        if(i == start) smallest = data[i];
        smallest = Math.min(data[i], smallest);
        largest = Math.max(data[i], largest);
        sum += data[i];
        if(sum == number) return [smallest, largest];
        if(sum > number) return [-1, -1];
    }
}

console.log("Encryption weakness: " + goThroughContiguous(goThrough1(getData())));
