const fs = require("fs");
const text = fs.readFileSync("./input2.txt", "utf-8");

function game_v2(data){
    const [p1, p2] = data;
    const played_games_record = new Set();
    while(p1.length != 0 && p2.length != 0){
        const round_id = get_id(p1, p2);
        if(played_games_record.has(round_id)) return [1, p1.reduce((sum, current, index, array) => sum += current * (array.length-index), 0)];
        const round_cards = [ p1.shift(), p2.shift() ];
        if(p1.length >= round_cards[0] && p2.length >= round_cards[1]){
            const subgame = game_v2([p1.slice(0, round_cards[0]), p2.slice(0, round_cards[1])]);
            if(subgame[0] == 1){
                p1.push(...round_cards);
            }else if(subgame[0] == 2){
                p2.push(...round_cards.reverse())
            }
        }else{
            const winner_cards = do_round(...round_cards);
            if(winner_cards[0] == 1) p1.push(...winner_cards[1]);
            if(winner_cards[0] == 2) p2.push(...winner_cards[1]);
        }
        played_games_record.add(round_id);
    }
    const winner = p1.length == 0 ? 2 : 1;
    const ret = [ winner, [...p1, ...p2].reduce((sum, current, index, array) => sum += current * (array.length-index), 0)];
    return ret;
}

function get_player_data(text){
    text = text.split("\n\n").map(player => {
        player = player.split(":\n");
        return player[1].match(/\b\d+\b/g).map(item => parseInt(item));
    });
    return text;
}

function do_round(p1_card, p2_card){
    return p1_card > p2_card ? [1, [p1_card, p2_card]] : [2, [p2_card, p1_card]];
}

function get_id(array1, array2){
    return array1.join("") + "|" + array2.join("");
}

function play_game(data){
    const [p1, p2] = data;
    while(p1.length != 0 && p2.length != 0){
        const round_cards = [ p1.shift(), p2.shift() ];
        const winner_cards = do_round(...round_cards);
        if(winner_cards[0] == 1) p1.push(...winner_cards[1]);
        if(winner_cards[0] == 2) p2.push(...winner_cards[1]);
    }
    return [...p1, ...p2].reduce((sum, current, index, array) => sum += current * (array.length-index), 0);
}

console.log("Part 1: " + play_game(get_player_data(text)));
console.log("Part 2: " + game_v2(get_player_data(text))[1]);
