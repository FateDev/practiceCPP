#include <string.h>
#include <stdlib.h>
#include <stdio.h>

int go_through(int *starting, int starting_len, int last_turn){
  int *large_array = malloc(sizeof(int) * last_turn);
  memset(large_array, -1, last_turn*sizeof(int));
  int last_num = starting[starting_len-1];
  for(int i = 0; i < starting_len-1; i++){
  	large_array[starting[i]] = i+1;
  }
  for(int i = starting_len-1; i < last_turn-1; i++){
		if(large_array[last_num] == -1){
			large_array[last_num] = i+1;
		  last_num = 0;
    }else{
	  	int last_pos = large_array[last_num];
      large_array[last_num] = i+1;
      last_num = i+1 - last_pos;
    }
  }
  return last_num;
}

int main(){
    int input[] = {9, 6, 0, 10, 18, 2, 1};
    printf("Part 1: %d\n", go_through(input, sizeof(input)/sizeof(int), 2020));
    printf("Part 2: %d\n", go_through(input, sizeof(input)/sizeof(int), 30000000));
}
