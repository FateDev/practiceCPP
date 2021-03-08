function to_letters(n){
	const thousands = Math.floor(n/1000);
	const hundreds = Math.floor(n/100) - 10*thousands;
	const tens = digit_to_letters((Math.floor(n/10) - hundreds*10 - thousands*100)*10);
	const remainder = digit_to_letters(n % 10);

	let str = "";

	if(n <= 19)
		return digit_to_letters(n);

	if(n < 100)
		return tens+remainder
	
	if(hundreds)
		str += digit_to_letters(hundreds) + "hundred";
	if(n % 100 <= 19 && n % 1000 > 0 && n % 100)
		str += "and"+digit_to_letters(n%100);
	else if(n % 1000 > 0 && n % 100 > 0)
		str += "and"+tens+remainder;
	
	if(n >= 1000)
		str = digit_to_letters(thousands)+"thousand"+str;

	return str;
}

function digit_to_letters(n){
	switch(n){
		case 1:
			return "one";
		case 2:
			return "two";
		case 3:
			return "three";
		case 4:
			return "four";
		case 5:
			return "five";
		case 6:
			return "six";
		case 7:
			return "seven";
		case 8:
			return "eight";
		case 9:
			return "nine";
		case 10:
			return "ten";
		case 11:
			return "eleven";
		case 12:
			return "twelve";
		case 13:
			return "thirteen";
		case 14:
			return "fourteen";
		case 15:
			return "fifteen";
		case 16:
			return "sixteen";
		case 17:
			return "seventeen";
		case 18:
			return "eighteen";
		case 19:
			return "nineteen";
		case 20:
			return "twenty";
		case 30:
			return "thirty";
		case 40:
			return "forty";
		case 50:
			return "fifty";
		case 60:
			return "sixty";
		case 70:
			return "seventy";
		case 80:
			return "eighty";
		case 90:
			return "ninety";
		default:
			return "";
	}
}

function sum_of_words_in_letters_to_limit(limit){
	let number_of_letters_sum = 0;
	for(let i = 1; i <= limit; i++)
		number_of_letters_sum += to_letters(i).length;
	return number_of_letters_sum;
}

console.log("The sum of the letters in the words representing the numbers between 1 and 1000 inclusive are:",sum_of_words_in_letters_to_limit(1000))
