function sum_of_squares(max){
  let sum_squares = 0;
  for(let i = 1; i <= max; i++)
    sum_squares += Math.pow(i, 2);
  return sum_squares;
}

function square_of_sum(max){
  let sum = 0;
  for(let i = 1; i <= max; i++)
    sum += i;
  return Math.pow(sum, 2);
}

function find_diff_square_sum_and_sum_squares(max){
  return square_of_sum(max) - sum_of_squares(max);
}

console.log("The difference between the squared sum and the sum of the squares of the first 100 natural numbers is:",find_diff_square_sum_and_sum_squares(100));