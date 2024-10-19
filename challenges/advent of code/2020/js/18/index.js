const fs = require("fs");
const text = fs.readFileSync("./input.txt", "utf-8");

function get_data(input){
    input = input.replace(/\)/g, "").split("\n");
    input.pop();
    const ingredients = new Set();
    const ingredients_array = [];
    input = input.map(row => {
        row = row.split(" (contains ")
        row[0].split(" ").forEach(item => ingredients_array.push(item));
        row[1] = row[1].split(", ");
        row[1].forEach(item => ingredients.add(item));
        return row;
    })
    return [ input, ingredients, ingredients_array ];
}

function union(setA, setB){
    const common = new Set();
    for(const item of setA) if(setB.has(item)) common.add(item);
    return common;
}

function exclude(setA, setB){
    const excluded = new Set();
    for(const item of setB) if(!setA.has(item)) excluded.add(item);
    return excluded;
}

function program(data){
    const allergen_to_food = {};
    for(const item of data[1]){ //loop over ingredients
        for(const pair of data[0]){ //loop over food
            if(pair[1].includes(item)){
                if(!allergen_to_food[item]) allergen_to_food[item] = [];
                allergen_to_food[item].push(new Set(pair[0].split(" ")));
            }
        }
    }

    const exclude_set = new Set();

    const allergen_translate = {};
    
    for(const pair of Object.entries(allergen_to_food)){
        let common = pair[1][0];
        for(let i = 1; i < pair[1].length; i++){
            common = union(common, pair[1][i]);
        }
        allergen_translate[pair[0]] = common;
        if(common.size == 1){
            exclude_set.add(Array.from(common)[0]);
        }
    }

    let all_1 = false;
    while(!all_1){
        all_1 = true;
        for(const pair of Object.entries(allergen_translate)){
            if(pair[1].size == 1) continue;
            allergen_translate[pair[0]] = exclude(exclude_set, pair[1]);
            const new_set = allergen_translate[pair[0]];
            
            if(new_set.size == 1){
                exclude_set.add(Array.from(new_set)[0]);
            }else{
                all_1 = false;
            }
        }
    }

    let non_allergens = 0;
    for(const item of data[2]){
        if(!exclude_set.has(item)) non_allergens++;
    }

    const english_to_other = {};

    for(const pair of Object.entries(allergen_translate)){
        english_to_other[Array.from(pair[1])[0]] = pair[0];
    }

    const ingredients_array = Array.from(exclude_set).sort((a, b) => {
        return english_to_other[a] > english_to_other[b] ? 1 : -1;
    });

    const list = ingredients_array.join(",");

    return [non_allergens, list];
}

const [ non_allergens, list ] = program(get_data(text));
console.log("Part 1: "+ non_allergens);
console.log("Part 2: " + list);
