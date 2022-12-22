/*
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.
*/

// This basically find the pivot using a binary search
// Then does a binary search using that pivot as an offset to find the value

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int size = nums.size();
        int lower = 0;
        int upper = size - 1;
        int pivotIdx = -1;

        // first find the pivot index
        while(lower <= upper && size > 1) {
            const int mid = (upper - lower)/2 + lower;
            
            // either the current index is the pivot
            // in which case it cannot be the last element
            // since if it were the last element then it
            // would be the same as not being pivoted at all
            if(mid != size-1 && nums[mid+1] < nums[mid]) {
                pivotIdx = mid;
                break;
            }
            // or the previous element is the pivot
            else if(mid != 0 && nums[mid-1] > nums[mid]) {
                pivotIdx = mid-1;
                break;
            } else if(nums[mid] > nums[upper]) {
                lower = mid + 1;
            } else {
                upper = mid - 1;
            }
        }
        
        lower = 0;
        upper = size - 1;
        int foundIdx = -1;

        // then do a nearly normal binary search to find the item
        while(lower <= upper) {
            const int mid = (upper - lower)/2 + lower;

            // translate the abstracted indexes into real indexes in the rotated array
            const int rotatedMid = (mid + pivotIdx + 1) % size;
            const int midEl = nums[rotatedMid];

            if(target == midEl) {
                // then the rotated index is the where it is found
                foundIdx = rotatedMid;
                break;
            } else if(target < midEl) {
                upper = mid - 1;
            } else {
                lower = mid + 1;
            }
        }

        return foundIdx;
    }
};
