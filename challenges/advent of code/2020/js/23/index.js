const input = "538914762";

function get_data(input, part2){
    const arr = input.split("").map(item => parseInt(item)-1); //array where each element is 1 less than in original
    const original_length = arr.length;
    const last = arr[arr.length-1];
    
    const links = [];
    for(let i = 0; i < arr.length; i++)
        links[arr[i]] = arr[mod(i+1, arr.length)];
    
    if(part2){
        links[last] = 9;
        for(let i = 9; i < 1000000; i++)
            links[i] = i+1;
        links[999999] = arr[0];
    }

    return [ arr[0], links ]
}

function move_cups(current, cups){
    const next_3 = cups[current];

    const exclude_three = [ next_3, cups[next_3] ];
    exclude_three[2] = cups[exclude_three[1]];

    const next_lowest = get_lowest(current, exclude_three, cups.length);
    const item_after_next_lowest = cups[next_lowest];

    cups[current] = cups[cups[cups[next_3]]];
    cups[next_lowest] = next_3;

    cups[cups[cups[cups[next_lowest]]]] = item_after_next_lowest;

    return [ cups[current], cups ];
}

function get_lowest(current, exclude_three, cups_length){
    while(exclude_three.includes(mod(--current, cups_length)));
    return mod(current, cups_length);
}

function mod(num, n){
    return (num + n) % n;
}

function get_in_answer_form(cups){
    let retStr = "";
    let current = 0;
    while(cups[current] != 0){
        current = cups[current];
        retStr += current+1;
    }
    return retStr;
}


function program(input, part2){
    let start = get_data(input, part2);
    let iters = part2 ? 10000000 : 100;

    for(let i = 0; i < iters; i++)
        start = move_cups(...start);
    
    if(part2){
        return (start[1][0]+1)*(start[1][start[1][0]]+1);
    }else{
        return get_in_answer_form(start[1])
    }
}

console.log("Part 1: " + program(input, false))
console.log("Part 2: " + program(input, true))
