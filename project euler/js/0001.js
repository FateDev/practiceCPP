function find_sum(multiples, limit){
  let sum = 0n;
  for(let i = 1n; i < limit; i++) {
    for(const multiple of multiples) {
      if(!(i % BigInt(multiple))) {
        sum += i;
        break;
      }
    }
  }
  return sum;
}

console.log("Sum of all the multiples of 3 or 5 below 1000:", find_sum([3, 5], 1000));
console.log("Sum of all the multiples of 3, 5 or 13 below 10000:", find_sum([3, 5, 13], 10000));