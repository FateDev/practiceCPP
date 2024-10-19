// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

/*
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
*/

// Does binary search to find the first item to fit the criteria

class Solution {
public:
    int firstBadVersion(int n) {
        int lower = 1;
        int upper = n;
        
        while(lower <= upper) {
            int mid = (upper - lower)/2 + lower;
            bool isBad = isBadVersion(mid);
            if(isBad) {
                upper = mid - 1;
            } else {
                lower = mid + 1;
            }
        }

        return lower;
    }
};
