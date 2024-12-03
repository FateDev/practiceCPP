from typing import Any
from abc import ABC, abstractmethod

class Solution(ABC):
    @abstractmethod
    def preprocess(self, filename: str) -> Any:
        ...

    @abstractmethod
    def part1(self, data) -> Any:
        ...

    @abstractmethod
    def part2(self, data) -> Any:
        ...

    def __init__(self, filename: str):
        self._filename: str = filename

    def run(self):
        data = self.preprocess(self._filename)
        print(f" ---- Solutions for data in {self._filename} ---- ")
        try:
            sol = self.part1(data)
            print(f"Part 1: {sol}")
        except Exception:
            pass
        
        try:
            sol = self.part2(data)
            print(f"Part 2: {sol}")
        except Exception:
            pass
