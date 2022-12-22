/*
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

  1)  Integers in each row are sorted from left to right.
  2)  The first integer of each row is greater than the last integer of the previous row.
*/

// Does a binary search to find what row it is on
// Then another one to check if it is in that row or not

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int lowerY = 0;
        int lowerX = 0;
        int upperY = matrix.size() - 1;
        int upperX = matrix[0].size() - 1;

        // find what row it is possibly in
        while(lowerY < upperY) {
            const int midY = (upperY - lowerY)/2 + lowerY;
            const int midEl = matrix[midY][upperX];

            if(midEl == target) {
                return true;
            } else if(target < midEl) {
                upperY = midY;
            } else {
                lowerY = midY+1;
            }
        }
        
        int y = lowerY;
        // binary search that row
        while(lowerX <= upperX) {
            const int midX = (upperX - lowerX)/2 + lowerX;
            const int midEl = matrix[y][midX];

            if(midEl == target) {
                return true;
            } else if(target < midEl) {
                upperX = midX - 1;
            } else {
                lowerX = midX + 1;
            }
        }

        return false;
    }
};
