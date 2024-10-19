function find_divisors(num){
  const divisors = [];
  if(num == 1) divisors.push(1); //add 1 for just this special case
  let divisor = 1;
  const original = num;
  while(divisor**2 < original){ //we will have all divisors above the square root while testing below it (num/divisor could be bigger than the sqrt)
    if(!(num % divisor)){
      divisors.push(num/divisor, divisor);
    }
    divisor++;
  }
  return divisors;
}

function triangle_num(n){
  return (Math.pow(n, 2)+n)/2;
}

function highly_divisible_triangular_number(){
  for(let i = 0; i < 15000; i++){
    let divisors = find_divisors(triangle_num(i)).length;
    if(divisors >= 500)
      return triangle_num(i);
  }
}

console.log("The first triangle number to have over five hundred divisors is:", highly_divisible_triangular_number());
