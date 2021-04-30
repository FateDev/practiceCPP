// uses some dynamic programming stuff to count all the possible combinations fast
function count_combos(p, q, r){
    if(r <= q)
        return p**r; // no limiting factor, exp growth r <= q
    else {
        let total = 0;
        let combos = [];
        for(let i = 1; i <= q; i++) // exp growth for various values of r
            combos[i] = p**i
        for(let i = q+1; i <= r; i++){ // adds up the exp growth values, as they are in sub-branches of larger possibility tree
            let local_sum = 0;
            for(let j = q; j > 0; j--)
                local_sum += (p-1)/p * combos[i - j];
            combos[i] = local_sum * p
        }
        return combos[r]
    }
}

// naive recursive generate of all possible words
function gen_letter_combos(p, q, r, parent_letter_num, parent_letter_num_reps){
    if(r == 1) return Array.from(Array(p)).map((item, idx) => String.fromCharCode(idx + 65)).filter(letter => {
        if(parent_letter_num_reps != q || letter != String.fromCharCode(parent_letter_num + 65))
            return letter;
    })

    let combos = [];
    for(let i = 0; i < p; i++){
        if(parent_letter_num_reps != q || i != parent_letter_num){
            const returned_combos = gen_letter_combos(p, q, r - 1, i, parent_letter_num == i ? parent_letter_num_reps + 1 : 1)
            combos.push(...(returned_combos.map(letters => String.fromCharCode(i + 65) + letters)))
        }
    }
    return combos 
}
