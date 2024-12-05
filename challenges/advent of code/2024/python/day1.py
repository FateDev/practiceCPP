import re
from collections import Counter
from typing import cast

from common.utils import load_aoc_data


def preprocess(data_path: str):
    data = load_aoc_data(data_path)
    lst1, lst2 = cast(
        tuple[list[int], list[int]],
        cast(object, zip(*re.findall("(\\d+)\\s+(\\d+)", data))),
    )
    lst1 = sorted(map(int, lst1))
    lst2 = sorted(map(int, lst2))
    return lst1, lst2


def part1(lst1: list[int], lst2: list[int]):
    return sum([abs(e2 - e1) for e1, e2 in zip(lst1, lst2)])


def part2(lst1: list[int], lst2: list[int]):
    cntd = Counter(lst2)
    return sum([cntd.get(e, 0) * e for e in lst1])


def day_one(data_path: str):
    lst1, lst2 = preprocess(data_path)
    p1 = part1(lst1, lst2)
    p2 = part2(lst1, lst2)
    print(f"Part 1: {p1}")
    print(f"Part 2: {p2}")


day_one("day1_example.txt")
day_one("day1.txt")
