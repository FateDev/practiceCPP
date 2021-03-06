function is_palindrome(num){
  num = num.toString().split("")
  if(num.length % 2)
    num.splice(Math.floor(num.length/2), 1).join("")
  if(num.slice(0,num.length/2).join("") == num.slice(num.length/2).reverse().join(""))
    return true;
  return false;
}

function search_2_nums_to_make_palindrome(num_lens){
  const palindromes = [];
  const [ upper, lower ] = [ Math.pow(10,num_lens)-1, Math.pow(10,num_lens-1)-1 ];
  for(let i = upper; i > lower; i--){
    for(let j = upper; j > lower; j--){
      if(is_palindrome(i*j))
        palindromes.push(i*j);
    }
  }
  return palindromes;
}

const max = (arr) => arr.reduce((max, curr) => curr > max ? curr : max);

console.log("The largest palindrome made by 2 2 digit numbers is: ", max(search_2_nums_to_make_palindrome(3)));