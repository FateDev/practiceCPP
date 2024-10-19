function evenly_divisible_num(nums){
  const factor_map = {};
  
  for(let num of nums){
    const factors = {};
    let current_divisor = 2;
    while(num != 1){ //makes a map of the prime factors, and the number of times they occur
      while(!(num % current_divisor)){
        if(!factors[current_divisor]) factors[current_divisor] = 0;
        factors[current_divisor]++;
        num /= current_divisor;
      }
      current_divisor += 1;
    }

    for(const item of Object.entries(factors)){
      factor_map[item[0]] = Math.max(factor_map[item[0]] ? factor_map[item[0]] : 0, item[1]);
      //makes sure the greatest number of occurences of prime factors in this map
    }
  }
  
  let product = 1;
  for(const item of Object.entries(factor_map)){
    product *= parseInt(item[0]) ** item[1]; //raises prime factors to the maximum number of times they occur, and gets the product
  }
  return product; //the number is now evenly divisible by all input numbers
}

function generate_array_to(max){
  const arr = [];
  for(let i = 1; i <= max; i++)
    arr.push(i);
  return arr;
}

console.log("The following number is evenly divisible by all numbers from 1 to 20:",evenly_divisible_num(generate_array_to(20)));