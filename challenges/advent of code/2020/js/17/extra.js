function populate_surrounding(coords, cache){ //will use a cache map and increment all the surrounding coordinates, surrounding a coord in n dimensions
    coords = coords.map(coord => parseInt(coord));
    const keys = surrounding_coords(coords);
    for(const key of keys){
        if(!cache[key]) cache[key] = 0;
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
