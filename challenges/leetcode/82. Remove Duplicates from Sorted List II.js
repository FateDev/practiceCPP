/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function removeDuplicates() {
    if(currVal != n.val) {
        if(currValAppearances > 1) {
            currStartPrev.next = n;
        } else {
            currStartPrev = prev;
        }
        
        currVal = n.val;
        currValAppearances = 1;
    } else {
        currValAppearances++;
    }
}

var deleteDuplicates = function(head) {
    let prev = null;
    let currVal = 0;
    let currValAppearances = 0;

    let prevHead = new ListNode(Infinity, head);
    let currStartPrev = prev;

    for(let n = prevHead; n != null;) {
        if(currVal != n.val) {
            if(currValAppearances > 1) {
                currStartPrev.next = n;
            } else {
                currStartPrev = prev;
            }
            
            currVal = n.val;
            currValAppearances = 1;
        } else {
            currValAppearances++;
        }

        prev = n;
        n = n.next;
    }

    if(currValAppearances > 1 && currStartPrev != null) {
        currStartPrev.next = null;
    }

    return prevHead.next;
};
