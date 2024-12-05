import re
from enum import Enum
from typing_extensions import override

from common.Solution import Solution

MUL_REGEX = re.compile(r"mul\((\d+),(\d+)\)")
DO_REGEX = re.compile(r"do(n't)?\(\)")

class Conditional(Enum):
    NOT_FOUND = 0
    DO_NEXT = 1
    DONT_NEXT = 2

def find_conditional(data: str, idx: int) -> tuple[Conditional, int]:
    try:
        item = next(re.finditer(DO_REGEX, data[idx:]))
        return Conditional.DO_NEXT if not item.group(1) else Conditional.DONT_NEXT, \
               item.end() + idx
    except StopIteration:
        return Conditional.NOT_FOUND, len(data)

def find_mul(data: str, idx: int) -> tuple[tuple[int, int], int]:
    try:
        item = next(re.finditer(MUL_REGEX, data[idx:]))
        return (int(item.group(1)), int(item.group(2))), item.end() + idx
    except StopIteration:
        return (0, 0), len(data)

class Day3(Solution):
    @override
    def part1(self, data: str) -> int:
        muls: list[tuple[str, str]] = re.findall(MUL_REGEX, data)
        return sum(int(n1) * int(n2) for n1, n2 in muls)

    @override
    def part2(self, data: str):
        total = 0
        idx = 0
        skip = Conditional.DO_NEXT

        def next_cond(idx: int):
            return find_conditional(data, idx)
        
        def next_mul(idx: int):
            return find_mul(data, idx)

        cond = next_cond(idx)
        mul = next_mul(idx)

        while idx < len(data):
            (n1, n2), idx_mul = mul
            skip_cond, idx_cond = cond

            if skip_cond != Conditional.NOT_FOUND and idx_cond <= idx_mul:
                skip = skip_cond
                idx = idx_cond
                cond = next_cond(idx)
            else:
                if skip == Conditional.DO_NEXT:
                    total += n1 * n2                
                idx = idx_mul
                mul = next_mul(idx)
        
        return total

    def __init__(self, filename: str):
        super().__init__(filename)

Day3("day3_example.txt").run()
Day3("day3.txt").run()
