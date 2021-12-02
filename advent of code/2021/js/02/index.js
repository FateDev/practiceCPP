var data = 
    [
      ...document
      	  .getElementsByTagName("pre")[0]
      	  .innerHTML
          .matchAll(/(.*?)\n/g)
    ]
		.map(el => {
			const [dir, amountStr] = el[1].split(" ")
      return [dir, parseInt(amountStr)]
		})

// [x horizontal, y depth]
var p1 = data
.reduce((acc, curr) => {
  if(curr[0] == "forward") acc[0] += curr[1]
	if(curr[0] == "up") acc[1] -= curr[1]
	if(curr[0] == "down") acc[1] += curr[1]
  return acc
}, [0, 0])
.reduce((acc, curr) => acc *= curr, 1)

var [p2x, p2y] = data
// [x horizontal, y depth, aim depth]
.reduce((acc, curr) => {
	if(curr[0] == "up") acc[2] -= curr[1]
	if(curr[0] == "down") acc[2] += curr[1]
  if(curr[0] == "forward") {
    acc[0] += curr[1]
		acc[1] += acc[2] * curr[1]
  }
  return acc
}, [0, 0, 0])
var p2 = p2x*p2y
