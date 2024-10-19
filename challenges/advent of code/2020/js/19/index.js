function expand(data){
    const letter_only = {};
    const new_data = [];
    for(let i = 0; i < data.length; i++){
        const row = data[i];
        if(row.search(/^\d+:[ ab|\(\)\+]+$/) !== -1){
            const split_row = row.split(": ");
            letter_only[split_row[0]] = split_row[1];
        }else{
            new_data.push(data[i]);
        }
    }
    new_data.forEach((item, index) => {
        for(const replace of Object.entries(letter_only)) {
            if(replace[1].length > 1) replace[1] = "("+replace[1]+")";
            replace[0] = new RegExp("\\b"+replace[0]+"\\b", "g");
            new_data[index] = new_data[index].split(": ")[0] + ": " + new_data[index].split(": ")[1].replace(replace[0], "  " + replace[1] + "  ");
        }
    })
    return new_data;
}

function evaluate_rules(data, recursiveDepth){
    for(let i = 0; i < data.length; i++){
        const split = data[i].split(": ");
        if(split[1].search(new RegExp("\\b"+split[0]+"\\b")) !== -1){
            for(let i = 0; i < recursiveDepth; i++){
                split[1] = split[1].replace(new RegExp("\\b"+split[0]+"\\b"), " ( " +split[1] + " ) ");
            }
            data[i] = split[0] + ": " + split[1].replace(new RegExp("\\b"+split[0]+"\\b"), "");
        }
    }
    let last_length = -1;
    while(data.length != 1) {
        data = expand(data);
        if(data.length == last_length) break;
        last_length = data.length;
    }
    return new RegExp("^"+data[0].split(": ")[1].replace(/ /g, "")+"$");
}

function do_problem(input, part2, recursiveDepth){
    if(part2){
        input = input.replace(/\b8:[ 0-9|]+\b/, "8: 42 | 42 8");
        input = input.replace(/\b11:[ 0-9|]+\b/, "11: 42 31 | 42 11 31");
    }
    const [rules, messages] = input.split("\n\n");
    const regex = evaluate_rules(rules.replace(/"/g, "").split("\n"), recursiveDepth);
    let num = 0;
    for(const row of messages.split("\n")){
        if(row.search(regex) !== -1) num++;
    }
    return num;
}

console.log("Part 1: " + do_problem(document.getElementsByTagName("pre")[0].innerText));
console.log("Part 2: " + do_problem(document.getElementsByTagName("pre")[0].innerText, true, 3));
