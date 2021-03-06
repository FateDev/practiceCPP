function prime_sum(max){
  const primes = [ 2 ];
  let prime_number = 1; //we start off from the first prime number, 2
  let last_found_prime = -1;

  let current_num = 3;
  while(current_num < max){
    let is_prime = true; //we assume it's a prime
    for(const prime of primes){ //we try to divide by all the prime numbers, one of them must be a factor for it to be a non prime number
      if(!(current_num % prime)){
        is_prime = false;
        break;
      }
    }
    if(is_prime){
      prime_number++;
      last_found_prime = current_num;
      primes.push(current_num);
    }
    current_num++;
  }
  return primes.reduce((sum, curr) => sum += curr, 0);
}

console.log("The sum of all the prime numbers below 2000000 is:",prime_sum(2000000));