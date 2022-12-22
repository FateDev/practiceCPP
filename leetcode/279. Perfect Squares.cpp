/*
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.
*/

// Variant of the knapsack problem, uses dynamic programming with function static variables

class Solution {
public:
    const int MAX_N = pow(10, 4);

    int lowestNumSum(const std::vector<int> &pSquares, std::vector<int> &pSums, int minIdx, int offset) {
        if(offset == 0) {
            return 0;
        } else if(offset <= 0 || minIdx >= pSquares.size()) {
            return MAX_N;
        }

        int preCalculated = pSums[offset-1];
        if(preCalculated != -1) {
            // we've already calculated this
            return preCalculated;
        }

        int lowest1 = 1 + lowestNumSum(pSquares, pSums, minIdx, offset - pSquares[minIdx]);
        int lowest2 = lowestNumSum(pSquares, pSums, minIdx + 1, offset);
        pSums[offset-1] = min(lowest1, lowest2);
        return pSums[offset-1];
    }

    int numSquares(int n) {
        // precompute needed perfect squares
        static std::vector<int> pSquares{};
        int pSqSz = pSquares.size();
        if(pSqSz*pSqSz < MAX_N) {
            int x = 1;
            while(x*x <= MAX_N) {
                pSquares.push_back(x*x);
                x++;
            }
        }

        // lazily compute perfect sums as needed, if not already computed
        static std::vector<int> perfectSums{-1};
        while(perfectSums.size() <= n) {
            perfectSums.push_back(-1);
            lowestNumSum(pSquares, perfectSums, 0, perfectSums.size());
        }

        return perfectSums[n-1];
    }
};
