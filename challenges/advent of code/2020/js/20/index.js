const fs = require("fs");
const text = fs.readFileSync("./input.txt", "utf-8");

function backtrack(
  current,
  size,
  corners,
  sides,
  middles,
  grid,
  IDtoTile,
  tileToID,
  exclude
) {
  const [coord, tile] = current;

  grid[coord[0]][coord[1]] = tile; //updates the current coord

  if (coord[0] == size - 1 && coord[1] == size - 1) return true; //if the current coord is the final coord, we're done

  let incrementX = 0;
  if (coord[0] + 1 == size) incrementX++;
  const new_coord = [(coord[0] + 1) % size, (coord[1] + incrementX) % size]; //increment the new coord correctly, sweeps downward in a straight line
  //ends in bottom right

  let valid_ids = get_ids(
    IDtoTile,
    tileToID,
    grid,
    new_coord,
    size,
    corners,
    sides,
    middles
  ); //gets the valid ids
  valid_ids = valid_ids.filter((item) => !exclude.has(item)); //filters out excluded items
  if (valid_ids.length == 0) return false; //if the length is now 0, dead branch

  for (const id of valid_ids) {
    //loop over each valid id
    const new_exclude = new Set([
      ...Array.from(exclude),
      ...get_exclude_ids(id),
    ]); //add this ID and all the IDs which are from the same base (since all are *8+i), to exclude set
    const ret = backtrack(
      [new_coord, id],
      size,
      corners,
      sides,
      middles,
      grid,
      IDtoTile,
      tileToID,
      new_exclude
    ); //recurse one level deeper
    if (ret == false) continue; //ignore dead branches
    return ret; //return true ones
  }

  return false; //if it got here, must be a dead branch, return
}

function get_exclude_ids(id) {
  //helper function to get the 8 ids which are the same/similar to this one
  const actual_id = Math.floor(id / 8);
  const retArray = [];
  for (let i = 0; i < 8; i++) {
    retArray.push(actual_id * 8 + i);
  }
  return retArray;
}

function intersect(arrayA, arrayB) {
  //gets the items in common with 2 array, doesn't handle duplicates correctly though
  return arrayA.filter((item) => arrayB.includes(item));
}

function get_ids(
  IDtoTile,
  tileToID,
  grid,
  coord,
  size,
  corners,
  sides,
  middles
) {
  //returns ids which may be possible for coord
  const surrounding = [
    grid[coord[0] - 1]?.[coord[1]],
    grid[coord[0]]?.[coord[1] - 1],
  ]; //top side, left side
  const _surroundings = [
    tileToID[IDtoTile[surrounding[0]]?.[2]],
    tileToID[IDtoTile[surrounding[1]]?.[1]],
  ];
  const top_side = _surroundings[0] ? _surroundings[0] : []; //bottom of one on top
  const left_side = _surroundings[1] ? _surroundings[1] : [];

  if (coord[0] == 1 && coord[1] == 2) {
    //console.log(intersect(top_side, left_side).filter(item => sides[2].has(item)))
  }
  if (coord[0] - 1 == -1) {
    //then at top
    if (coord[1] + 1 == size) {
      //at top right
      return left_side.filter((item) => corners[1].has(item));
    } else {
      //sides
      return left_side.filter((item) => sides[0].has(item));
    }
  } else if (coord[0] + 1 == size) {
    //then at bottom
    if (coord[1] - 1 == -1) {
      //at bottom left
      return top_side.filter((item) => corners[3].has(item));
    } else if (coord[1] + 1 == size) {
      //at bottom right
      return intersect(top_side, left_side).filter((item) =>
        corners[2].has(item)
      );
    } else {
      //sides
      return intersect(top_side, left_side).filter((item) =>
        sides[2].has(item)
      );
    }
  } else if (coord[1] - 1 == -1) {
    //at left side
    return top_side.filter((item) => sides[3].has(item));
  } else if (coord[1] + 1 == size) {
    //at right side
    return intersect(top_side, left_side).filter((item) => sides[1].has(item));
  } else {
    //one of the middles
    return intersect(top_side, left_side).filter((item) => middles.has(item));
  }
}

function separate_data(data) {
  const [tiles, tilesToID] = data;
  const corners = [new Set(), new Set(), new Set(), new Set()]; //top left, top right, bottom left, bottom right
  const sides = [new Set(), new Set(), new Set(), new Set()]; //top, right, bottom, left
  const middles = new Set();

  for (const tile of tiles) {
    //loop through each tile, and get the tiles with only 2 connections, they must be the corners
    let connection_side_indexes = [];
    for (let i = 0; i < 4; i++) {
      if (
        tilesToID[tile[1][i]].filter(
          (item) => Math.floor(item / 8) != Math.floor(tile[0] / 8)
        ).length > 0
      )
        connection_side_indexes.push(i);
    }

    if (connection_side_indexes.length == 2) {
      if (connection_side_indexes[0] == 1 && connection_side_indexes[1] == 2)
        corners[0].add(tile[0]);
      if (connection_side_indexes[0] == 2 && connection_side_indexes[1] == 3)
        corners[1].add(tile[0]);
      if (connection_side_indexes[0] == 0 && connection_side_indexes[1] == 3)
        corners[2].add(tile[0]);
      if (connection_side_indexes[0] == 0 && connection_side_indexes[1] == 1)
        corners[3].add(tile[0]);
    } else if (connection_side_indexes.length == 3) {
      if (!connection_side_indexes.includes(0)) sides[0].add(tile[0]);
      if (!connection_side_indexes.includes(1)) sides[1].add(tile[0]);
      if (!connection_side_indexes.includes(2)) sides[2].add(tile[0]);
      if (!connection_side_indexes.includes(3)) sides[3].add(tile[0]);
    } else if (connection_side_indexes.length == 4) {
      middles.add(tile[0]);
    }
  }
  return [corners, sides, middles];
}

function rot90cw(tile) {
  const lines = tile.match(/^[A-z#0-9\.]+$/gm).map((line) => line.split(""));
  const new_lines = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (!new_lines[j]) new_lines[j] = "";
      new_lines[j] += lines[i][j];
    }
  }
  return new_lines
    .reduce(
      (str, line) => (str += line.split("").reverse().join("") + "\n"),
      ""
    )
    .trim();
}

function flip_horizontal(tile) {
  return tile
    .match(/^[A-z#0-9\.]+$/gm)
    .reduce(
      (str, line) => (str += line.split("").reverse().join("") + "\n"),
      ""
    )
    .trim();
}

function generate_transformations(tile, id, separate = true) {
  tile = tile.trim();
  const tiles = [];
  tiles.push([id * 8, tile]);
  tiles.push([id * 8 + 1, rot90cw(tile)]);
  tiles.push([id * 8 + 2, rot90cw(rot90cw(tile))]);
  tiles.push([id * 8 + 3, rot90cw(rot90cw(rot90cw(tile)))]);
  tiles.push([id * 8 + 4, flip_horizontal(tile)]);
  tiles.push([id * 8 + 5, rot90cw(flip_horizontal(tile))]);
  tiles.push([id * 8 + 6, rot90cw(rot90cw(flip_horizontal(tile)))]);
  tiles.push([id * 8 + 7, rot90cw(rot90cw(rot90cw(flip_horizontal(tile))))]);
  if (separate) return tiles.map((item) => [item[0], separate_tile(item[1])]);
  return tiles;
}

function separate_tile(tile) {
  const tile_array = tile
    .match(/^[A-z#0-9\.]+$/gm)
    .map((line) => line.split(""));
  const top = tile_array[0];
  const bottom = tile_array[tile_array.length - 1];
  const left = [];
  const right = [];
  const remainder = [];
  for (let i = 0; i < tile_array.length; i++) {
    left.push(tile_array[i][0]);
    right.push(tile_array[i][tile_array[0].length - 1]);
  }
  for (let i = 1; i < tile_array.length - 1; i++) {
    for (let j = 1; j < tile_array[0].length - 1; j++) {
      if (!remainder[i - 1]) remainder[i - 1] = [];
      remainder[i - 1][j - 1] = tile_array[i][j];
    }
  }
  return [
    [top.join(""), right.join(""), bottom.join(""), left.join("")],
    remainder.map((row) => row.join("")),
  ];
}

function get_data(text) {
  //clockwise, top, right, bottom, left => A, B, C, D
  text = text.split("\n\n");
  text.pop();
  const tiles = [];
  const tiles_data = [];
  const tileToID = {};
  text = text.map((tile) => {
    tile = tile.split(":\n");
    tile[0] = parseInt(tile[0].replace("Tile ", ""));

    const tiles_generated = generate_transformations(tile[1], tile[0]);
    const tiles_to_sides = tiles_generated.map((item) => [item[0], item[1][0]]);
    const tiles_to_data = tiles_generated.map((item) => [item[0], item[1][1]]);

    tiles_data.push(...tiles_to_data); //tile ID to tile pair array
    tiles.push(...tiles_to_sides); //pushes all orientations of this tile to the array
  });
  for (const tile of tiles) {
    //make a map of edges of any orientation to an array of IDs they are used in
    for (let i = 0; i < 4; i++) {
      if (!tileToID[tile[1][i]]) tileToID[tile[1][i]] = [];
      tileToID[tile[1][i]].push(tile[0]);
    }
  }
  return [tiles, tileToID, Object.fromEntries(tiles_data)];
}

function get_roughness(tile) {
  return tile.join("").replace(/[\.O]/g, "").length;
}

function replace_at(string, index, replace){
  const str_arr = string.split("");
  str_arr[index] = replace;
  return str_arr.join("");
}

function mark_dragons(tile) {
  const length = tile[0].length; tile = tile.slice()



  for (let i = 0; i < tile.length - 2; i++) {
    for (let j = 0; j < length - 20; j++) {
      //the pattern is 20 characters long
      let match1 = tile[i].slice(j).search(/[#\.]{18}#[#\.]{1}/);
      let match2 = tile[i + 1]
        .slice(j)
        .search(/#[#\.]{4}##[#\.]{4}##[#\.]{4}###/);
      let match3 = tile[i + 2]
        .slice(j)
        .search(/[#\.]{1}#(?:[#\.]{2}#){5}[#\.]{3}/);
      if (match1 == 0 && match2 == 0 && match3 == 0) {
        const new_line_1 = replace_at(tile[i], j + 18, "O");

        const line2replace = [
          j,
          j + 5,
          j + 6,
          j + 11,
          j + 12,
          j + 17,
          j + 18,
          j + 19,
        ];
        let new_line_2 = tile[i + 1];
        for (const idx of line2replace)
          new_line_2 = replace_at(new_line_2, idx, "O");

        const line3replace = [j + 1, j + 4, j + 7, j + 10, j + 13, j + 16];
        let new_line_3 = tile[i + 2];
        for (const idx of line3replace)
          new_line_3 = replace_at(new_line_3, idx, "O");

        tile[i] = new_line_1;
        tile[i + 1] = new_line_2;
        tile[i + 2] = new_line_3;
      }
    }
  }
  return tile;
}

function program(data) {
  const size = Math.sqrt(data[0].length / 8);

  const [corners, sides, middles] = separate_data(data);

  //below goes over the array of corners, and combines them all into one set, which gives you 4 unique values, which are multiplied together to get the sum
  const corner_sum = Array.from(new Set(corners.reduce((arr, set) => [...arr, ...Array.from(set).map(item => Math.floor(item/8))], []))).reduce((sum, current) => sum *= current, 1);

  const grid = [];
  for (
    let i = 0;
    i < size;
    i++ //making the 2D array
  )
    grid[i] = [];

  const IDtoTile = Object.fromEntries(data[0]);
  let done = false;

  for (const topleft_corner of corners[0]) {
    const reassembled = backtrack(
      [[0, 0], topleft_corner],
      size,
      corners,
      sides,
      middles,
      grid,
      IDtoTile,
      data[1],
      new Set([...get_exclude_ids(topleft_corner)])
    );

    if (reassembled) {
      done = true;
      break;
    }
  }

  if (done) {
    const data_array = grid.map((row) => row.map((item) => data[2][item]));
    let reassembled_grid = "";
    for (let i = 0; i < data_array.length; i++) {
      const lines = [];
      for (let j = 0; j < data_array[i][0].length; j++) {
        for (let k = 0; k < data_array[i].length; k++) {
          if (!lines[j]) lines[j] = "";
          lines[j] += data_array[i][k][j];
        }
      }
      reassembled_grid += lines.reduce(
        (str, current) => (str += current + "\n"),
        ""
      );
    }
    reassembled_grid = reassembled_grid.trim();
    const transformed_maps = generate_transformations(
      reassembled_grid,
      0,
      false
    ).map((item) => item[1].split("\n"));
    
    //since only one orientation has any sea monsters at all, it'll also be the one with the least number of # symbols, so we just get the minimum
    return [ corner_sum, transformed_maps.reduce((min, tile) => min = Math.min(get_roughness(mark_dragons(tile)),min), Infinity) ];
  } else {
    return "Not found";
  }
}

const [ part1, part2 ] = program(get_data(text));
console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
