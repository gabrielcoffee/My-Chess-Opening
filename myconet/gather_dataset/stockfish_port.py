# this program will be used to build the dataset with stockfish evals for each position

# major part of the code has been adapted from https://github.com/zhelyabuzhsky/stockfish

import subprocess
from typing import Any, List, Optional

class Stockfish:
    """Integrates the Stockfish chess engine with Python."""

    def put_in(self, command: str) -> None:
        if not self.stockfish.stdin:
            raise BrokenPipeError()
        self.stockfish.stdin.write(f"{command}\n")

        self.stockfish.stdin.flush()
        final_lines = []
        for _ in range(18):
            line = self.get_lines()

            try:
                if "Final evaluation: none (in check)" in line[1]:
                    return []
            except IndexError:
                final_lines.append(line)

        return final_lines


    def get_lines(self) -> str:
        if not self.stockfish.stdout:
            raise BrokenPipeError()
        return self.stockfish.stdout.readlines(1)

    def __init__(
        self, path: str = "stockfish", depth: int = 2, parameters: dict = None
    ) -> None:
        self.stockfish = subprocess.Popen(
            path, universal_newlines=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE
        )

    def _put(self, command: str) -> None:
        if not self.stockfish.stdin:
            raise BrokenPipeError()
        self.stockfish.stdin.write(f"{command}\n")
        self.stockfish.stdin.flush()

    def _start_new_game(self) -> None:
        self._put("ucinewgame")
        self._is_ready()
        self.info = ""

    def set_fen_position(self, fen_position: str) -> None:
        """Sets current board position in Forsyth–Edwards notation (FEN).

        Args:
            fen_position:
              FEN string of board position.

        Returns:
            None
        """
        self._start_new_game()
        self._put(f"position fen {fen_position}")

    def _is_ready(self) -> None:
        self._put("isready")
        while True:
            if self._read_line() == "readyok":
                return

    def _read_line(self) -> str:
        if not self.stockfish.stdout:
            raise BrokenPipeError()
        return self.stockfish.stdout.readline().strip()