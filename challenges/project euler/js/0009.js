

function find_product_of_pythagorean_triplet(){
  // a + b + c = 1000
  // c = 1000 - a - b
  // c^2 = 1000000 - 2000a - 2000b + 2ab + a^2 + b^2
  //
  // a^2 + b^2 = c^2
  // a^2 + b^2 = 1000000 - 2000a - 2000b + 2ab + a^2 + b^2
  // 0 = 1000000 - 2000a - 2000b + 2ab
  // 2000b - 2ab = 1000000 - 2000a
  // b(1000 - a) = 500000 - 1000a
  // b = (500000 - 1000a)/(1000 - a)

  const is_natural_number = (a) => Math.round(a) === a && a > 0; //test to check if natural numbers

  for(let a = 1; a < 500; a++){ // since b would be negative for a > 500, we test first 499, since otherwise b is not a natural number
    const [ test_a, test_b ] = [a, (500000 - 1000*a)/(1000 - a)];
    if(is_natural_number(test_a) && is_natural_number(test_b))
      return test_a * test_b * Math.sqrt(test_a**2+test_b**2); //found a*b*c for natural numbers
  }

  return -1; //didn't find a*b*c for natural numbers
}

console.log("Special pythagorean triplet:", find_product_of_pythagorean_triplet());