var data = 
    [
      ...document
      	  .getElementsByTagName("pre")[0]
      	  .innerHTML
          .matchAll(/(\d+)\n/g)
    ]
		.map(el => parseInt(el[1])
)

function getIncreasedLength(data){
	return data
	.filter((el, idx, arr) => el > arr[idx-1])
	.length
}

var p1 = getIncreasedLength(data)
var p2 = getIncreasedLength(data.map((el, idx, arr) => el + arr[idx+1] + arr[idx+2]))
