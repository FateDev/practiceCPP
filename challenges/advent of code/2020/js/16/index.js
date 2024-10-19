function get_data(text){
    text = text.split("\n\n");
    text[0] = text[0].split("\n").map(item => {
        item = item.split(": ");
        item[1] = item[1].split(" or ").map(range => range.split("-").map(number => parseInt(number)));
        return item;
    });
    text[1] = text[1].split("\n")[1].split(",").map(number => parseInt(number));
    text[2] = text[2].split("\n").map(numbers => numbers.split(",").map(number => parseInt(number)));
    text[2] = text[2].slice(1);
    text[2].pop();
    return text;
}

const in_range = (num, low, high) => num >= low && num<= high;

function intersection(...sets){
    const union = new Set();
    for(const set of sets){
        for(const element of set){
            union.add(element);
        }
    }

    const intersects_all = new Set();
    for(const element of union){
        let invalid = false;
        for(let i = 0; i < sets.length; i++){
            if(!sets[i].has(element)){
                invalid = true;
                break;
            }
        }
        if(!invalid) intersects_all.add(element);
    }

    return intersects_all;
}

function exclude_set(set, exclude){
    const excluded = new Set();
    for(const element of set){
        if(!exclude.has(element)) excluded.add(element);
    }
    return excluded;
}

function go_through_part2(data){
    const [ranges, my_ticket, other_tickets] = data;
    const valid_tickets = [];
    
    for(let i = 0; i < other_tickets.length; i++){
        const ticket = other_tickets[i];
        let invalid_ticket = false;
        for(const num of ticket){
            let invalid = true;
            for(const range of ranges){
                if(in_range(num, range[1][0][0], range[1][0][1]) || in_range(num, range[1][1][0], range[1][1][1])) invalid = false;
            }
            if(invalid){
                invalid_ticket = true;
                break;
            }
        }
        if(!invalid_ticket) valid_tickets.push(ticket);
    }

    const ticket_array_of_sets = [];

    for(const ticket of valid_tickets){
        for(let i = 0; i < ticket.length; i++){
            const num = ticket[i];
            const set = new Set();
            for(const range of ranges){
                if(in_range(num, range[1][0][0], range[1][0][1]) || in_range(num, range[1][1][0], range[1][1][1])){
                    set.add(range[0]);
                }
            }
            if(!ticket_array_of_sets[i]) ticket_array_of_sets[i] = [];
            ticket_array_of_sets[i].push(set);
        }
    }

    const used_fields = new Set();
    const processed = [];

    for(const set_array of ticket_array_of_sets){
        const intersect = intersection(...set_array);
        processed.push(intersect);
        if(intersect.size == 1) used_fields.add(Array.from(processed[processed.length-1])[0]);
    }

    while(true){
        let all_len_is_1 = true;
        for(let i = 0; i < processed.length; i++){
            if(processed[i].size == 1) continue; //length of 1 means this label must belong to this specific field
            const diff = exclude_set(processed[i], used_fields);
            processed[i] = diff;
            if(diff.size == 1){
                used_fields.add(Array.from(diff)[0]);
            }else{
                all_len_is_1 = false;
            }
        }
        if(all_len_is_1) break;
    }

    let answer = 1;
    for(let i = 0; i < processed.length; i++){
        if(Array.from(processed[i])[0].indexOf("departure") == 0){
            answer *= my_ticket[i];
        }
    }

    return answer;
}

function go_through(data){
    const [ranges, my_ticket, other_tickets] = data;
    let error_rate = 0;
    for(const ticket of other_tickets){
        for(const num of ticket){
            let invalid = true;
            for(const range of ranges){
                if(in_range(num, range[1][0][0], range[1][0][1]) || in_range(num, range[1][1][0], range[1][1][1])) invalid = false;
            }
            if(invalid) error_rate += num;
        }
    }
    return error_rate;
}

console.log("Part 1: " + go_through(get_data(document.getElementsByTagName("pre")[0].innerText)));
console.log("Part 2: " + go_through_part2(get_data(document.getElementsByTagName("pre")[0].innerText)));
