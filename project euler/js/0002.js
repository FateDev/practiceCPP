function fib_even_sum(max){
  let prev_before = 0;
  let prev = 1;
  let current = 1;
  let even_sum = 0;
  while(current < max) {
    prev_before = prev;
    prev = current;
    current = prev + prev_before;
    if(!(current % 2)) even_sum += current;
  }
  return even_sum;
}

console.log("Sum of even Fibonacci numbers which don't exceed 4 million:",fib_even_sum(4000000));