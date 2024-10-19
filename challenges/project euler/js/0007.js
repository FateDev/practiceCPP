function prime_find(num){
  const primes = [ 2 ];
  let prime_number = 1; //we start off from the first prime number, 2
  let last_found_prime = -1;

  let current_num = 3;
  while(prime_number < num){
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
  return last_found_prime;
}

console.log("The 10,001st prime number is:",prime_find(10001));