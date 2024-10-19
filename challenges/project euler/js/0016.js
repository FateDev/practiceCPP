console.log("The sum of the digits of 2^1000 is:",(1n<<1000n).toString().split("").reduce((sum, curr) => sum += parseInt(curr), 0))
