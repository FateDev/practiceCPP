/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */

/*
You are given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *lout_head{};
        ListNode *lout_tail{};
        
        int carry = 0;
        for(ListNode *el1 = l1, *el2 = l2; el1 != nullptr || el2 != nullptr;) {
            int value = carry;
            if(el1 != nullptr) value += el1->val;
            if(el2 != nullptr) value += el2->val;
            int outVal = value % 10;
            carry = (value - outVal)/10;
            
            auto old_tail = lout_tail;
            if(lout_tail)
                lout_tail = lout_tail->next;
            
            lout_tail = new ListNode();
            if(!lout_head)
                lout_head = lout_tail;
            if(old_tail)
                old_tail->next = lout_tail;
            
            lout_tail->val = outVal;
            
            if(el1 != nullptr) el1 = el1->next;
            if(el2 != nullptr) el2 = el2->next;
        }
        
        if(carry != 0)
            lout_tail->next = new ListNode(carry);
        
        return lout_head;
    }
};
