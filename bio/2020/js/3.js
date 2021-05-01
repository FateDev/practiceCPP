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

function test(p, q, r, target, expected){
    const pass_or_fail = traverse_possibility_graph(p, q, r, target) == expected
    console.log(`traverse_possibility_graph(${p}, ${q}, ${r}, ${target}) == "${expected}":`, pass_or_fail)
    return pass_or_fail
}

function tests(){ // testing with output of all [3, 3, 5] since I had lots of bugs with various inputs for it, as well as the provided "BABA" example
    const test_arr = [...gen_letter_combos(3, 3, 5).map((output, idx) => [3, 3, 5, idx+1, output]), [2, 2, 4, 7, "BABA"]]
    let all_passed = true;
    for(const test_item of test_arr){
        try {
            test(...test_item) ? "" : all_passed = false;
        } catch(e){
            console.log(e, test_item)
            all_passed = false;
        }
    }
    if(all_passed) console.log("ALL PASSED")
}

function traverse_possibility_graph(p, q, r, target){
    // modeled the entire possibility space as a directed cyclic graph, r limits it,
    // and since it doesn't go back, only need to store state info in the output string
    target -= 1; // this is an idx to the possibility array, so subtract 1

    const letters_gen = () => Array.from(Array(p)).map((item, idx) => String.fromCharCode(idx + 65))
    let letters = letters_gen()

    let combos = [];
    for(let i = 1; i <= q; i++)
        combos[i] = p**i
    for(let i = q+1; i <= r; i++){ // gets the number of combinations for various depths
        let local_sum = 0;
        for(let j = q; j > 0; j--)
            local_sum += (p-1)/p * combos[i - j];
        combos[i] = local_sum * p
    }

    combos.shift()
    combos.push(undefined)
    combos = combos.reverse() // puts it into a format suited to going from top to bottom of the graph

    let current = 0;
    let str = ""
    let current_letter = "";
    let current_letter_rep = 0;
    let parent_num = 0;
    for(let i = 1; i <= r; i++){
        let new_letter = "" // the new letter to pick, however it is come about

        if(i == 1){
            let idx = Math.floor((target * p)/combos[i]);
            new_letter = letters[idx];
            current += idx * combos[i]/p;
            parent_num = combos[i]/p; // the number of children the parent has
        }else{
            if(current_letter_rep == q){ // max reps reached
                letters = letters_gen().filter(letter => letter != current_letter)
                current_letter = ""
                current_letter_rep = 0
            }else{
                letters = letters_gen() // maybe the letters array was filtered last time, so reset it
            }

            let new_num = combos[i]*(p-1)/p // the number of combinations for this layer (one element is always missing)
            let repeat_new_num = parent_num - new_num // the number of children of child who is equal to parent letter
            new_num /= p-1; // the number of combinations for each element in this layer (besides a possible repeated one)
            
            if(current_letter != ""){ // there are p children here, p-1 of them have value new_num, the remaining one, repeat_new_num
                const index_of_parent_letter = letters.indexOf(current_letter)
                const letter_values_arr = letters.map(letter => new_num);
                letter_values_arr[index_of_parent_letter] = repeat_new_num;
                const [ idx, offset ] = fit_idx(target, letter_values_arr, current)
                current += offset;
                new_letter = letters[idx];
                parent_num = letter_values_arr[idx];
            }else{ // max reps were reached, so there are p-1 children here
                let letter_values_arr = letters.map(letter => new_num);
                const [ idx, offset ] = fit_idx(target, letter_values_arr, current)
                current += offset;
                new_letter = letters[idx];
                parent_num = letter_values_arr[idx]; // update parent num
            }
        }

        str += new_letter; // add the new letter to the final output path string

        if(current_letter == new_letter){
            current_letter_rep++;
        }else{ // count the number of reps for only the current letter, since current letter has changed, update and reset reps
            current_letter = new_letter;
            current_letter_rep = 1
        }
    }
    return str
}

function run_3a(){
    const [p, q, r] = prompt("Please enter space separated values for p, q and r", "2 2 4").split(" ").map(letter => parseInt(letter))
    const path_num = prompt("Enter the path number please", "7")
    console.log(traverse_possibility_graph(p, q, r, path_num))
}
