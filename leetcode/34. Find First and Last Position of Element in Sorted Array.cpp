/*
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.
*/

// Does a modified binary search first to find the top of that range
// Then one to find the bottom

class Solution {
public:
    int binarySearch(vector<int>& nums, int target, bool findUpper) {
        int lower = 0;
        int higher = nums.size()-1;
        int foundIdx = -1;
        
        while(lower <= higher) {
            int mid = (higher - lower)/2 + lower;
            int midEl = nums[mid];

            // looking for upper range, and either we're at the end or the previous element is different
            const bool foundTopOfRange = findUpper && ((mid+1 == nums.size()) || (mid+1 < nums.size() && nums[mid+1] != target));

            // not looking for upper range, and either we're at the start or the next element is different
            const bool foundBottomOfRange = !findUpper && ((mid == 0) || (mid > 0 && nums[mid-1] != target));

            if(target == midEl) {
                if(foundTopOfRange || foundBottomOfRange) {
                    // found the correct position
                    foundIdx = mid;
                    break;
                } else if(findUpper) {
                    // if we were finding the top of the range,
                    // shift the bottom upwards
                    lower = mid + 1;
                } else {
                    // otherwise we shift the top downwards
                    higher = mid - 1;
                }
            } else if(target < midEl) {
                higher = mid - 1;
            } else {
                lower = mid + 1;
            }
        }

        return foundIdx;
    }

    vector<int> searchRange(vector<int>& nums, int target) {
        int upper = binarySearch(nums, target, true);
        int lower = binarySearch(nums, target, false);
        return {lower, upper};
    }
};
