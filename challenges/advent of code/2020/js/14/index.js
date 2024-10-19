function get_data(text){
    text = text.split("mask");
    text.shift()
    text = text.map(item => {
        const itemData = item.split("\n").map(line => {
            line = line.replaceAll(" ", "")
            if(line.indexOf("mem") === -1) return line.replaceAll("=", "")
            line = line.split("=")
            line[0] = parseInt(line[0].replaceAll("mem[","").replaceAll("]",""))
            line[1] = BigInt(parseInt(line[1]))
            return line;
        })
        itemData.pop();
        return itemData;
    })
    return text;
}

function initialise_memory(data){
    let address_space = {};
    for(const program of data){
        address_space = mask_program(program[0], program.splice(1), address_space);
    }
    let total = 0n;
    for(const value of Object.values(address_space)){
        total += value;
    }
    return total;
}

function apply_mask(mask, number){
    const AND_mask = BigInt(parseInt(mask.replace(/\d/g, 0).replace(/X/g, 1), 2));
    const OR_mask = BigInt(parseInt(mask.replace(/X/g, 0), 2));
    number = number & AND_mask;
    return number | OR_mask;
}

function mask_program(mask, address_value_pairs, address_space){
    for(const pair of address_value_pairs){
        address_space[pair[0]] = apply_mask(mask, pair[1])
    }
    return address_space;
}

console.log("Part 1: " + initialise_memory(get_data(document.getElementsByTagName("pre")[0].innerText)));

function get_addresses(mask, number){
    if(mask.indexOf("X") !== -1){
        let mask0 = mask.replace(/X/, "0")
        let mask1 = mask.replace(/X/, "1");
        let array = [...get_addresses(mask0, number), ...get_addresses(mask1, number)];
        return array;
    }else{
        return [ BigInt(parseInt(mask, 2)) | number ];
    }
}

function initialise_memory_2(data){
    let address_space = {};
    for(const program of data){
        for(const pair of program.splice(1)){
            const addresses = get_addresses(...apply_mask_2(program[0], pair[0]));
            for(const address of addresses){
                address_space[address] = pair[1];
            }
        }
    }
    let total = 0;
    for(const value of Object.values(address_space)){
        total += value;
    }
    return total;
}

function apply_mask_2(mask, number){
    const AND_mask = BigInt(parseInt(mask.replace(/\d/g, 1).replace(/X/g, 0), 2));
    const OR_mask = BigInt(parseInt(mask.replace(/X/g, 0), 2));
    const FLOAT_mask = mask.replace(/\d/g, 0);
    return [FLOAT_mask, ( number & AND_mask ) | OR_mask];
}

function get_data_2(text){
    text = text.split("mask");
    text.shift()
    text = text.map(item => {
        const itemData = item.split("\n").map(line => {
            line = line.replaceAll(" ", "")
            if(line.indexOf("mem") === -1) return line.replaceAll("=", "")
            line = line.split("=")
            line[0] = BigInt(parseInt(line[0].replaceAll("mem[","").replaceAll("]","")))
            line[1] = parseInt(line[1])
            return line;
        })
        itemData.pop();
        return itemData;
    })
    return text;
}

console.log("Part 2: " + initialise_memory_2(get_data_2(document.getElementsByTagName("pre")[0].innerText)));
