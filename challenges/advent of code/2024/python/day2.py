import re
from typing import Callable

from common.utils import load_aoc_data

def preprocess(filename: str):
    return [
        [int(m[0]) for m in re.findall(r"((\d+)[ ]*)", l)]
        for l in load_aoc_data(filename).splitlines()
    ]

def safe_pair(n1: int, n2: int, going_up: bool) -> bool:
    if (n2 > n1 and not going_up) or (n1 > n2 and going_up):
        return False
    if not 1 <= abs(n1 - n2) <= 3:
        return False
    return True

def safe(seq: list[int]) -> bool:
    if len(seq) <= 1:
        return True
    
    going_up = seq[1] > seq[0]
    for n1, n2 in zip(seq, seq[1:]):
        if not safe_pair(n1, n2, going_up):
            return False
    return True

def safe_tolerant(seq: list[int]) -> bool:
    if len(seq) <= 1:
        return True
    
    going_up = seq[1] > seq[0]
    for i, j in zip(range(len(seq)), range(1, len(seq))):
        n1, n2 = seq[i], seq[j]
        if not safe_pair(n1, n2, going_up):
            return safe(seq[:i] + seq[i+1:]) \
                or safe(seq[:j] + seq[j+1:]) \
                or safe(seq[1:])
    return True

def safety(data: list[list[int]], safety_fn: Callable[[list[int]], bool]):
    return sum([1 if safety_fn(d) else 0 for d in data])

def day2(filename: str):
    data = preprocess(filename)
    p1 = safety(data, safe)
    p2 = safety(data, safe_tolerant)
    print(f"Part 1: {p1}")
    print(f"Part 2: {p2}")

day2("day2.txt")
day2("day2_example.txt")
