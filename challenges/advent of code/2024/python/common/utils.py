import subprocess

from pathlib import Path
from functools import cache


def cmd(command: str) -> str:
    return subprocess.check_output(command, shell=True).decode().strip()


@cache
def repo_root():
    return cmd("git rev-parse --show-toplevel")


def load_aoc_data(filename: str) -> str:
    return Path(
        f"{repo_root()}/challenges/advent of code/2024/data/{filename}"
    ).read_text()
