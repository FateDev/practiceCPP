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

function generate_transformations(tile, id) {
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
  return tiles.map((item) => [item[0], separate_tile(item[1])]);
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
    remainder.reduce((str, line) => (str += line.join("") + "\n"), "").trim(""),
  ];
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
  if(separate) return tiles.map((item) => [item[0], separate_tile(item[1])]);
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
    remainder.reduce((str, line) => (str += line.join("") + "\n"), "").trim(""),
  ];
}

const tile = `
.#.#..#.##...#.##..#####
###....#.#....#..#......
##.##.###.#.#..######...
###.#####...#.#####.#..#
##.#....#.##.####...#.##
...########.#....#####.#
....#..#...##..#.#.###..
.####...#..#.....#......
#..#.##..#..###.#.##....
#.####..#.####.#.#.###..
###.#.#...#.######.#..##
#.####....##..########.#
##..##.#...#...#.#.#.#..
...#..#..#.#.##..###.###
.#.#....#.##.#...###.##.
###.#...#..#.##.######..
.#.#.###.##.##.#..#.##..
.####.###.#...###.#..#.#
..#.#..#..#.#.#.####.###
#..####...#.#.#.###.###.
#####..#####...###....##
#.##..#..#...#..####...#
.#.###..##..##..####.##.
...###...##...#...#..###
`;

function get_data(text) {
  //clockwise, top, right, bottom, left => A, B, C, D
  text = text.split("\n\n");
  text.pop();
  const tiles = [];
  const tileToID = {};
  text = text.map((tile) => {
    tile = tile.split(":\n");
    tile[0] = parseInt(tile[0].replace("Tile ", ""));
    tiles.push(
      ...generate_transformations(tile[1], tile[0]).map((item) => [
        item[0],
        item[1][0],
      ])
    ); //pushes all orientations of this tile to the array
  });
  for (const tile of tiles) {
    //make a map of edges of any orientation to an array of IDs they are used in
    for (let i = 0; i < 4; i++) {
      if (!tileToID[tile[1][i]]) tileToID[tile[1][i]] = [];
      tileToID[tile[1][i]].push(tile[0]);
    }
  }
  console.log(tileToID);
  return [tiles, tileToID];
}

console.log(rot90cw(tile));
console.log("");
generate_transformations(tile, 100, false).forEach(item => console.log(item[0], item[1]));
