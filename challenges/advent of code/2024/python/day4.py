from typing import Generic, TypeVar, Callable
from typing_extensions import override
from abc import ABC, abstractmethod

from common.Solution import Solution

T = TypeVar("T")


class IterCallable(ABC, Generic[T]):
    @abstractmethod
    def ingest_data(self, data: T, i: int, j: int): ...

    def __call__(self, data: T, i: int, j: int):
        self.ingest_data(data, i, j)

    @abstractmethod
    def next_line(self):
        """
        Called when the current line has finished processing
        """
        ...


class DefaultIterCallable(IterCallable[T]):
    @override
    def ingest_data(self, data: T, i: int, j: int):
        print(data)

    @override
    def next_line(self):
        print("###")


IncrFn = Callable[[int, int], tuple[int, int]]
ActionFn = IterCallable


def generic_iter(
    data: list[list[T]],
    i_incr: IncrFn = lambda i, j: (i + 1, j),
    j_incr: IncrFn = lambda i, j: (i, j + 1),
    starting_i: int = 0,
    starting_j: int = 0,
    callable_obj: IterCallable[T] = DefaultIterCallable[T](),
):
    i, j = starting_i, starting_j
    len_i, len_j = len(data), len(data[0])

    def in_bounds(i: int, j: int) -> bool:
        return 0 <= i < len_i and 0 <= j < len_j

    while in_bounds(i, j):
        starting_ij = i, j
        while in_bounds(i, j):
            callable_obj(data[i][j], i, j)
            i, j = j_incr(i, j)
        callable_obj.next_line()
        i, j = i_incr(starting_ij[0], starting_ij[1])


class XMASMatchCallable(IterCallable[str]):
    def __init__(self):
        self._curr_state: str = ""
        self._matches: int = 0

    @override
    def ingest_data(self, data: str, i: int, j: int):
        if self._curr_state == "X" and data == "M":
            self._curr_state = "M"
        elif self._curr_state == "M" and data == "A":
            self._curr_state = "A"
        elif self._curr_state == "A" and data == "S":
            self._curr_state = ""
            self._matches += 1
        elif data == "X":
            self._curr_state = "X"
        else:
            self._curr_state = ""

    @override
    def next_line(self):
        self._curr_state = ""

    def total_matches(self) -> int:
        return self._matches


class MASMatchCallable(IterCallable[str]):
    def __init__(self):
        self._curr_state: str = ""
        self._curr_A_idx = None, None
        self._matches: int = 0
        self._center_A_idxs = []

    def _reset_state(self):
        self._curr_A_idx = None, None
        self._curr_state = ""

    @override
    def ingest_data(self, data: str, i: int, j: int):
        if self._curr_state == "M" and data == "A":
            self._curr_state = "A"
            self._curr_A_idx = i, j
        elif self._curr_state == "A" and data == "S":
            self._center_A_idxs.append(self._curr_A_idx)
            self._matches += 1
            self._reset_state()
        elif data == "M":
            self._curr_state = "M"
        else:
            self._reset_state()

    @override
    def next_line(self):
        self._reset_state()

    def center_a_locations(self) -> set[tuple[int, int]]:
        locations = set()
        for i, j in self._center_A_idxs:
            locations.add((i, j))
        return locations


class Day4(Solution):
    def __init__(self, filename: str):
        super().__init__(filename)

        self._main_diag_configs = []
        self._other_diag_configs = []

    @override
    def preprocess(self, input_data: str) -> list[list[str]]:
        return [list(l) for l in input_data.splitlines()]

    def part1(self, data):
        main_diag_config = {
            "i_incr": lambda i, j: (i, j - 1) if j > 0 else (i + 1, j),
            "j_incr": lambda i, j: (i + 1, j + 1),
            "starting_j": len(data[0]) - 1,
        }

        other_diag_config = {
            "i_incr": lambda i, j: (i, j + 1) if j < len(data) - 1 else (i + 1, j),
            "j_incr": lambda i, j: (i + 1, j - 1),
        }

        reverse_main_diag_config = {
            "i_incr": lambda i, j: (i, j + 1) if j < len(data) - 1 else (i - 1, j),
            "j_incr": lambda i, j: (i - 1, j - 1),
            "starting_i": len(data[0]) - 1,
        }

        reverse_other_diag_config = {
            "i_incr": lambda i, j: (i, j - 1) if j > 0 else (i - 1, j),
            "j_incr": lambda i, j: (i - 1, j + 1),
            "starting_i": len(data) - 1,
            "starting_j": len(data[0]) - 1,
        }

        vertical_config = {
            "i_incr": lambda i, j: (i, j + 1),
            "j_incr": lambda i, j: (i + 1, j),
        }

        reverse_vertical_config = {
            "i_incr": lambda i, j: (i, j - 1),
            "j_incr": lambda i, j: (i - 1, j),
            "starting_i": len(data) - 1,
            "starting_j": len(data[0]) - 1,
        }

        horizontal_config = {
            "i_incr": lambda i, j: (i + 1, j),
            "j_incr": lambda i, j: (i, j + 1),
        }

        reverse_horizontal_config = {
            "i_incr": lambda i, j: (i - 1, j),
            "j_incr": lambda i, j: (i, j - 1),
            "starting_i": len(data) - 1,
            "starting_j": len(data[0]) - 1,
        }

        self._main_diag_configs = [
            main_diag_config,
            reverse_main_diag_config,
        ]

        self._other_diag_configs = [
            other_diag_config,
            reverse_other_diag_config,
        ]

        iter_styles = [
            vertical_config,
            reverse_vertical_config,
            horizontal_config,
            reverse_horizontal_config,
        ]

        iter_styles += self._main_diag_configs + self._other_diag_configs

        match_obj = XMASMatchCallable()
        for style in iter_styles:
            generic_iter(data, callable_obj=match_obj, **style)
        return match_obj.total_matches()

    def part2(self, data):
        match_obj_main = MASMatchCallable()
        for style in self._main_diag_configs:
            generic_iter(data, callable_obj=match_obj_main, **style)
        main_a_locations = match_obj_main.center_a_locations()

        other_obj_main = MASMatchCallable()
        for style in self._other_diag_configs:
            generic_iter(data, callable_obj=other_obj_main, **style)
        other_a_locations = other_obj_main.center_a_locations()

        x_mases = 0
        for loc in main_a_locations:
            if loc in other_a_locations:
                x_mases += 1
                other_a_locations.remove(loc)
        return x_mases


Day4("day4_example.txt").run()
Day4("day4.txt").run()
