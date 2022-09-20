function binarySearch(searchList, value) {
  let arrayPath = [];

  let notFound = false;
  function binPath(startIdx, endIdx) {
    if(startIdx > endIdx) {
      notFound = true;
      return;
    }
    
    const mid = startIdx + Math.floor((endIdx - startIdx)/2);
    const midVal = searchList[mid];
    
    arrayPath.push(midVal);
    if(value == midVal) {
      return mid;
    } else if(value < midVal) {
      return binPath(startIdx, mid-1);
    } else {
      return binPath(mid+1, endIdx);
    }
  }

  binPath(0, searchList.length-1);

  if(notFound)
    return "Value Not Found"
  return arrayPath;
}
