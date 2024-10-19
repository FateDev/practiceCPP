/** 
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */
 
 // Variant of binary search

class Solution {
public:
    int guessNumber(int n) {
        int guessResp;
        uint64_t lowest = 0;
        uint64_t windowWidth = (n-1) / 2 + 1;
        uint64_t maxInt = std::numeric_limits<int>::max();

        while((guessResp = guess(std::min(maxInt, lowest+windowWidth))) != 0) {
            if(guessResp < 0) {
                windowWidth = (windowWidth-1)/2 + 1;
            } else {
                lowest += windowWidth;
            }
        }

        return std::min(maxInt, lowest+windowWidth);
    }
};
