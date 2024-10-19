function merge(array1, array2) {
  let a1len = array1.length;
  let a2len = array2.length;
  let output = [];
  for(let i = 0, j = 0; i < a1len || j < a2len;) {
    if(j >= a2len || array1[i] < array2[j]) {
      output.push(array1[i]);
      i++;
    } else {
      output.push(array2[j]);
      j++;
    }
  }
  return output;
}

function splitArray(array) {
  const len = Math.floor(array.length / 2);
  return [array.slice(0, len), array.slice(len)];
}

function mergeSort(array) {
  if(array.length == 1) {
    return array;
  }
  
  const [a1, a2] = splitArray(array);
  const sortedA1 = mergeSort(a1);
  const sortedA2 = mergeSort(a2);
  return merge(sortedA1, sortedA2);
}
