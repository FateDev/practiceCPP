/*
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.
*/

// Basically does a binary search, but at the end ensures the returned index is correct

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int lower = 0;
        int upper = nums.size();

        // basically do a binary search
        // this will modify the lower bound such that it
        // is in the correct position, or just below it
            // since if the element isn't found, the window between lower and upper will narrow until it is <=1 wide
            // then either we are at the correct position, or just below it
            // that is what is checked at line 27
        while(lower < upper) {
            const int mid = (upper - lower)/2 + lower;
            const int midEl = nums[mid];

            if(target == midEl) {
                return mid;
            } else if(target < midEl) {
                upper = mid - 1;
            } else {
                lower = mid + 1;
            }
        }

        int output = lower;
        if(lower >= 0 && lower < nums.size() && nums[lower] < target) {
            output++;
        }

        return output;
    }
};
