function partition(array) {
  // input: [Number]
  // output: [[Number], [Number]]

  // helper to swap
	const swap = (idx1, idx2) => {
    let tmp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = tmp;
  }
  
  if(array.length == 1) {
    return array;
  }
  
  let pivotIdx = 0;
  let minUnpartitioned = 1;

  for(let i = 0; i < array.length; i++) {
    if(array[i] < array[pivotIdx]) {
      swap(minUnpartitioned, i);
      minUnpartitioned++;
    }
  }
  
  const maxPartitioned = minUnpartitioned - 1;
  swap(maxPartitioned, pivotIdx);
  // swap pivot to correct position
  // such that all elements to the left are smaller
  
  let leftArray, rightArray;
  // ensure empty arrays are never returned
  if(maxPartitioned == 0) {
    leftArray = array.slice(0, minUnpartitioned);
    rightArray = array.slice(minUnpartitioned);
  } else {
		leftArray = array.slice(0, maxPartitioned);
		rightArray = array.slice(maxPartitioned);
  }
  
  return [leftArray, rightArray]
}

function quickSort(array) {
  if(array.length == 1) {
    return array;
  }

  const [left, right] = partition(array);
  const leftSorted = quickSort(left);
  const rightSorted = quickSort(right);

  return leftSorted.concat(rightSorted);
}
