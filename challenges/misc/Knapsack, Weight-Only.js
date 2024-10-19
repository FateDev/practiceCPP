// Given an input array, goal is to construct all possible sums using the elements in the array
// So the general approach is to try to construct a sum for every n in [0...sum(array_elems)]

function knapsackWeightOnlyRecur(weights) {
    const max = weights.reduce((acc, curr) => acc += curr, 0);
    const sumsIdxd = [];
    
    function ks(idx, remaining) {
        if(idx >= weights.length || remaining <= 0) {
            return remaining == 0;
        }
        
        if(sumsIdxd[idx] === undefined) {
            sumsIdxd[idx] = [];
        }
        
        if(sumsIdxd[idx][remaining] !== undefined) {
            return sumsIdxd[idx][remaining];
        }
        
        return sumsIdxd[idx][remaining] =
            ks(idx+1, remaining - weights[idx]) ||
	        ks(idx+1, remaining);
    }
    
    const outs = [];
    for(let i = 0; i <= max; i++) {
        if(ks(0, i)) {
            outs.push(i);
        }
    }
    
    return outs;
}

// bottom up dynamic programming approach
function knapsackWeightOnly(weights) {
    const max = weights.reduce((acc, curr) => acc += curr, 0);
    let rowA = [1];
    let rowB = [];
    
    for(let i = 0; i < weights.length; i++) {
        for(let j = 0; j <= max; j++) {
            rowB[j] |= rowA[j];
            
            const item = weights[i];
            if(j - item >= 0) {
                rowB[j] |= rowA[j - item];
            }
        }
        const t = rowB;
        rowB = rowA;
        rowA = t;
    }
    
    const sums = [];
    for(let i = 0; i < rowA.length; i++) {
        if(rowA[i] == 1) {
            sums.push(i);
        }
    }
    
    return sums;
}
