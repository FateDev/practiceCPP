/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
 
/*
We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to start another job that starts at time X.
*/

// Variant of the knapsack problem
// Idea to basically maximise profit in an interval
// So you sort the profits and intervals to do this
 
var jobScheduling = function(startTime, endTime, profit) {
	const startEndProfitTriple = startTime
		.map((el, idx) => [el, idx])
    	.sort(([s1, i1], [s2, i2]) => s1 - s2)
    	.map(([el, idx]) => [el, endTime[idx], profit[idx]]);
    
    let prevProfits = [];

    const maxJobs = startEndProfitTriple.length;  
    function maxProfit(lastEndTime, currentJob) {
        if(currentJob < maxJobs) {
      			const [start, end, profitForJob] = startEndProfitTriple[currentJob];
            if(start >= lastEndTime) {
                let oldLastEndTime = lastEndTime;
                lastEndTime = end;
                
                if(!prevProfits[currentJob+1]) {
                    prevProfits[currentJob+1] = Math.max(
                        profitForJob + maxProfit(lastEndTime, currentJob+1),
                        maxProfit(oldLastEndTime, currentJob+1)
                    );
                }
                
                return prevProfits[currentJob+1];
            } else {
                return maxProfit(lastEndTime, currentJob+1);
            }
        } else {
            return 0;
        }
    }
    
    return maxProfit(0, 0, 0);
};
