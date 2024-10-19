function get_data(text, dims){
    dims -= 2;
    if(dims < 0) return "The number of dimensions must be at least 2";
    text = text.split("\n").map(row => row.split(""))
    text.pop();
    const grid = {};
    const dimArr = [];
    for(let i = 0; i < dims; i++) dimArr.push(0);
    for(let i = 0; i < text.length; i++){
        for(let j = 0; j < text[0].length; j++){
            if(text[i][j] == "#"){
                if(dimArr.length == 0) insert_elem(grid, [i, j]);
                insert_elem(grid, [i, j, ...dimArr]);
            }
        }
    }
    return grid;
}

function populate_surrounding(coords, cache){ //will use a cache map and increment all the surrounding coordinates, surrounding a coord in n dimensions
    let coords_key = coords.reduce((str, current) => str += current+",", "");
    coords_key = coords_key.slice(0, coords_key.length-1);
    coords = coords.map(coord => parseInt(coord));
    const keys = surrounding_coords(coords);
    for(const key of keys){
        if(!cache[key]) cache[key] = 0;
        if(key == coords_key) continue;
        cache[key]++;
    }
}

function surrounding_coords(coord, dims){ //gets all surrounding coords in the number of dimensions the coord is listed to be in
    if(!dims) dims = coord.length;
    if(dims == 1){
        const retStrs = [];
        for(let i = -1; i <= 1; i++) retStrs.push((coord[coord.length-1]+i).toString());
        return retStrs;
    }
    const retStrs = [];
    for(let i = -1; i <= 1; i++){
        const returnedStrs = surrounding_coords(coord, dims-1);
        for(const str of returnedStrs){
            retStrs.push(coord[coord.length-dims]+i+","+str);
        }
    }
    return retStrs;
}

function get_elems(map){ //will recursively get all elements in a map
    const entries = Object.entries(map);
    const keys = [];
    if(typeof entries[0][1] == "object"){
        for(const entry of entries){
            const retVals = get_elems(entry[1]);
            for(const val of retVals){
                keys.push([entry[0], ...val]);
            }
        }
    }else if(entries[0][1] == "#"){
        for(const entry of entries){
            keys.push([entry[0]]);
        }
    }
    return keys;
}

function update(data){
    const cache_map = {};
    const elems = get_elems(data);
    for(const elem of elems){
        populate_surrounding(elem, cache_map);
    }
    const new_data = {};
    let count = 0;
    for(const item of Object.entries(cache_map)){
        if(item[1] == 3){
            const coord = item[0].split(",");
            insert_elem(new_data, coord);
            count++;
        }else if(item[1] == 2){
            const coord = item[0].split(",");
            if(check_elem(data, coord)){
                count++;
                insert_elem(new_data, coord);
            }
        }
    }
    return [count, new_data];
}

function check_elem(map, coord){
    if(coord.length == 1) return map[coord[0]] == "#";
    if(!map[coord[0]]) return false;
    return check_elem(map[coord[0]], coord.slice(1));
}

function insert_elem(map, coord){
    if(coord.length == 1) return map[coord[0]] = "#";
    if(!map[coord[0]]) map[coord[0]] = {};
    insert_elem(map[coord[0]], coord.slice(1));
    return map;
}

function get_active_cubes(input, dimensions){
    let data = get_data(input, dimensions)
    let count = 0;
    for(let i = 0; i < 6; i++){
        [count, data] = update(data);
    }
    return count;
}

console.log("Part 1: " + get_active_cubes(document.getElementsByTagName("pre")[0].innerText, 3));
console.log("Part 2: " + get_active_cubes(document.getElementsByTagName("pre")[0].innerText, 4));
console.log("Part 3: " + get_active_cubes(document.getElementsByTagName("pre")[0].innerText, 5));
console.log("Part 4: " + get_active_cubes(document.getElementsByTagName("pre")[0].innerText, 6));
