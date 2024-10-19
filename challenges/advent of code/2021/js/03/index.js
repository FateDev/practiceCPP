var data = 
    [
      ...document
      	  .getElementsByTagName("pre")[0]
      	  .innerHTML
          .matchAll(/(.*?)\n/g)
    ]
		.map(el => el[1].split("").map(it => parseInt(it)))

var sumArr = data
.reduce((acc, curr) => acc.map((el, idx) => el + curr[idx])
, new Array(data[0].length).fill(0))
.map(el => Math.round(el / data.length))

function getGammaEpsilon(arr){
	arr = arr.reverse()
  const gamma = arr.reduce((acc, curr, idx) => acc += curr * Math.pow(2, idx))
  return [gamma, Math.pow(2, arr.length)-1-gamma]
}

var p1 = getGammaEpsilon(sumArr).reduce((acc, curr) => acc *= curr)

function getRate(arr, rate){ // rate = 0 is oxygen, rate = 1 is c02
  const zeros = arr.filter(el => el[0] == 0).map(el => el.slice(1))
	const ones = arr.filter(el => el[0] == 1).map(el => el.slice(1))

	// check if it has run out of items, or one of the arrays has
	if(zeros.length == 0 && ones.length == 0) return ""
	if(zeros.length == 0) return "1" + ones[0].join("")
	if(ones.length == 0) return "0" + zeros[0].join("")

	if(
		rate == 0 && ones.length >= zeros.length || 
		rate == 1 && ones.length < zeros.length
	) return "1" + getRate(ones, rate)
	return "0" + getRate(zeros, rate)
}

var c02rate = parseInt(getRate(data, 1), 2)
var oxrate = parseInt(getRate(data, 0), 2)
var p2 = c02rate*oxrate
