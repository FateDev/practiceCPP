function get_largest_prime_factor(n){
  const prime_factors = new Set();
  let current_divisor = 2;
  while(n != 1){
    while(!(n % current_divisor)){
      prime_factors.add(current_divisor);
      n /= current_divisor;
    }
    current_divisor += 1;
  }
  return Array.from(prime_factors).reduce((max, curr) => max = curr > max ? curr : max, 0);
}

console.log("The largest prime factor of 600851475143 is:", get_largest_prime_factor(600851475143));