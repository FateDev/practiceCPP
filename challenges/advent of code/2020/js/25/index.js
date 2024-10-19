const pk_card = 5099500;
const pk_door = 7648211;

function transform(subject_number, loop_size){
    let num = 1;
    for(let i = 0; i < loop_size; i++){
        num = num * subject_number;
        num = num % 20201227;
    }
    return num;
}

function find_loop_size(subject_number, pk){
    let loop_size = 0;
    let num = 1;
    while(num != pk){
        loop_size++;
        num = num * subject_number;
        num = num % 20201227;
    }
    return loop_size;
}

function part_1(pk_card, pk_door){
    const [ loop_size_card, loop_size_door ] = [ find_loop_size(7, pk_card), find_loop_size(7, pk_door) ];
    return [ transform(pk_card, loop_size_door), transform(pk_door, loop_size_card) ];
}

console.log(part_1(pk_card, pk_door)[0]);
