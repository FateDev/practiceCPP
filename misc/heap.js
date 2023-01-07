function fixHeap(arr, node, minHeap) {
    const leftNode = 2*(node+1) - 1; // zero indexed
    const rightNode = leftNode + 1;
    
    if(leftNode >= arr.length) {
        return;
    }
  
    // use this to switch between building a min or max heap
  	const maxSubHeapComparison = (a, b) => a < b;
  	const minSubHeapComparison = (a, b) => a >= b;
  	const correctComparison = minHeap ? minSubHeapComparison : maxSubHeapComparison;
 
    // get the correct subheap
    let correctSubHeap;
    if(leftNode == arr.length-1) {
        correctSubHeap = leftNode;
    } else if (correctComparison(arr[rightNode], arr[leftNode])) {
        // if equal, favour the right heap
        correctSubHeap = leftNode;
    } else {
        correctSubHeap = rightNode;
    }
    
    if(correctComparison(arr[node], arr[correctSubHeap])) {
        const t = arr[node];
        arr[node] = arr[correctSubHeap];
        arr[correctSubHeap] = t;
        
        fixHeap(arr, correctSubHeap, minHeap);
    }
}

function buildHeapInPlace(arr, node, minHeap) {
    const leftNode = 2*(node+1) - 1; // zero indexed
    const rightNode = leftNode + 1;
    
    if(leftNode < arr.length) {
        buildHeapInPlace(arr, leftNode, minHeap);
    }

    if(rightNode < arr.length) {
        buildHeapInPlace(arr, rightNode, minHeap);
    }
    
    fixHeap(arr, node, minHeap);
}

function getFirstHeapElem(arr) {
  	return arr[0];
}

function deleteHeapElem(arr, minHeap) {
    if(arr.length == 0) return;

    arr[0] = arr[arr.length-1];
    arr.pop();

    if(arr.length == 0) return;
    fixHeap(arr, 0, minHeap)
}

const buildMinHeapInPlace = (arr) => buildHeapInPlace(arr, 0, true);
const deleteMinHeapElem = (arr) => deleteHeapElem(arr, true);
const getMinHeapElem = (arr) => getFirstHeapElem(arr);

const buildMaxHeapInPlace = (arr) => buildHeapInPlace(arr, 0, false);
const deleteMaxHeapElem = (arr) => deleteHeapElem(arr, false);
const getMaxHeapElem = (arr) => getFirstHeapElem(arr);
