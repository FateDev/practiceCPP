/*
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.
*/

class Solution {
public:
    int search(vector<int>& nums, int target) {
        const int maxIdx = nums.size() - 1;
        int lower = 0;
        int upper = maxIdx;

        while(lower < upper) {
            const int mid = (upper - lower)/2 + lower;
            const int midEl = nums[mid];
            if(target == midEl){
                return mid;
            } else if(target < midEl) {
                upper = mid - 1;
            } else {
                lower = mid + 1;
            }
        }

        if(lower == upper && lower >= 0 && lower <= maxIdx) {
            return nums[lower] == target ? lower : -1;
        }

        return -1;
    }
};
