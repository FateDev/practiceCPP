import re
from enum import Enum
from typing_extensions import override

from common.utils import load_aoc_data
from common.Solution import Solution

MUL_REGEX = r"mul\((\d+),(\d+)\)"
DO_REGEX = r"do(n't)?\(\)"

class Conditional(Enum):
    DO_NEXT = 0
    DONT_NEXT = 1

def find_conditional(data: str, idx: int):
    try:
        item = next(re.finditer(DO_REGEX, data[idx:]))
        return Conditional.DO_NEXT if not item.group(1) else Conditional.DONT_NEXT, \
               item.end() + idx
    except StopIteration:
        return None

def find_mul(data: str, idx: int):
    try:
        item = next(re.finditer(MUL_REGEX, data[idx:]))
        return (int(item.group(1)), int(item.group(2))), item.end() + idx
    except StopIteration:
        return None

class Day3(Solution):
    @override
    def preprocess(self, filename: str):
        return load_aoc_data(filename)

    @override
    def part1(self, data: str) -> int:
        muls: list[tuple[str, str]] = re.findall(MUL_REGEX, data)
        ans = sum([
            int(mul[0]) * int(mul[1])
            for mul in muls
        ])
        return ans

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

        while mul:
            if cond:
                (n1, n2), idx_mul = mul
                skip_cond, idx_cond = cond

                if idx_mul < idx_cond:
                    if skip == Conditional.DO_NEXT:
                        total += n1 * n2
                    idx = idx_mul
                    mul = next_mul(idx)
                else:
                    skip = skip_cond
                    idx = idx_cond
                    cond = next_cond(idx)
            else:
                (n1, n2), idx_mul = mul

                if skip == Conditional.DO_NEXT:
                    total += n1 * n2
                
                idx = idx_mul
                mul = next_mul(idx)
        
        return total

    def __init__(self, filename: str):
        super().__init__(filename)

Day3("day3_example.txt").run()
Day3("day3.txt").run()
