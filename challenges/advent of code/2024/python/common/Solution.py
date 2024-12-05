from typing import Any
from abc import ABC, abstractmethod

from common.utils import load_aoc_data


class Solution(ABC):
    def preprocess(self, input_data: str) -> Any:
        return input_data

    @abstractmethod
    def part1(self, data) -> Any: ...

    @abstractmethod
    def part2(self, data) -> Any: ...

    def __init__(self, filename: str):
        self._filename: str = filename

    def run(self):
        input_data = load_aoc_data(self._filename)
        data = self.preprocess(input_data)

        print(f" ---- Solutions for data in {self._filename} ---- ")
        try:
            sol = self.part1(data)
            print(f"Part 1: {sol}")
        except Exception as e:
            print(e)

        try:
            sol = self.part2(data)
            print(f"Part 2: {sol}")
        except Exception as e:
            print(e)
