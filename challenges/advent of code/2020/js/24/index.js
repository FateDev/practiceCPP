const fs = require("fs");
const text = fs.readFileSync("./input.txt", "utf-8");
const sixthcircle = Math.PI/3;
const scale_low = 10**10;
const scale_high = 10**14;

function parse_line(line){
    const instructions = line.match(/(se|e|sw|w|nw|ne)/g);
    let pos = [0, 0];
    for(const instruction of instructions){
        const move = step(instruction);
        pos = [pos[0] + move[0], pos[1] + move[1]];
    }
    return [ pos.map(item => Math.round(item*scale_low)), pos.map(item => Math.round(item*scale_high)) ];
}

function step(direction){
    switch(direction){
        case "nw":
            return rotate(1, 0, 1*sixthcircle);
        case "w":
            return rotate(1, 0, 2*sixthcircle);
        case "sw":
            return rotate(1, 0, 3*sixthcircle);
        case "se":
            return rotate(1, 0, 4*sixthcircle);
        case "e":
            return rotate(1, 0, 5*sixthcircle);
        case "ne":
            return rotate(1, 0, 6*sixthcircle);
    }
    return "INVALID";
}

const rotate = (x, y, theta) => [x*Math.cos(theta) - y*Math.sin(theta), x*Math.sin(theta) + y*Math.cos(theta)]

function get_data(text){
    return text.match(/^[news]+$/gm);
}

const coord_to_str = coord => coord.reduce((str, current) => str += current+",", "");

function flip_to_white(pos, pos_map, check_deeper = true){
    const directions = [ "nw", "w", "sw", "se", "e", "ne" ];
    pos = pos.map(item => parseInt(item))

    const update_tiles = [];

    let black_count = 0;
    for(let i = 0; i < directions.length; i++){
        const move = step(directions[i]);
        const pos_check = [pos[0]/scale_high + move[0], pos[1]/scale_high + move[1]];
        const str = coord_to_str(pos_check.map(item => Math.round(item*scale_low)));
        if(check_deeper){
            update_tiles.push(...flip_to_white(pos_check.map(item => Math.round(item*scale_high)), pos_map, false));
        }
        if(pos_map[str]) black_count++;
    }

    const coord_str = coord_to_str(pos.map(item => Math.round((item/scale_high)*scale_low)));

    update_tiles.push([ coord_str,
        black_count > 2 && black_count == 0 ? [] :
        black_count == 2 ? [ 0, pos ] :
        black_count == 1 && pos_map[coord_str] ? [ 0, pos ] : []
    ]);

    return update_tiles;
}

function program(data){
    let pos_map = {};
    for(const line of data){
        const [ pos_low, pos_high ] = parse_line(line);
        const pos_str = coord_to_str(pos_low);
        if(!pos_map[pos_str])
            pos_map[pos_str] = pos_high;
        else
            delete pos_map[pos_str];
    }

    const original_facing_up = Object.values(pos_map).length;
    
    for(let i = 0; i < 100; i++){
        const new_pos_map = {};
        const new_entries = [];
        for(const pair of Object.entries(pos_map)){
            const pos_high = pair[1];
            new_entries.push(...flip_to_white(pos_high, pos_map).filter(item => item[1][0] == 0))
        }
        new_entries.forEach(item => {
            new_pos_map[item[0]] = item[1][1];
        })
        pos_map = new_pos_map;
    }

    const a_hundred_days_later = Object.values(pos_map).length;

    return [ original_facing_up, a_hundred_days_later ];
}

const [ part1, part2 ] = program(get_data(text));
console.log("Part 1: " + part1 + "\nPart 2: " + part2);
