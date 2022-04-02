import { useState, useEffect } from "react";

function ChessBoard() {
  const [cellSize, setCellSize] = useState(2);
  const [clicked, setClicked] = useState(false);
  const [knightPosition, setKnightPosition] = useState({ x: 7, y: 1 });

  useEffect(() => {
    window.innerWidth >= 1024 ? setCellSize(3) : setCellSize(2);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 1024 ? setCellSize(3) : setCellSize(2);
    });
  });

  const handleClick = () => {
    clicked ? setClicked(false) : setClicked(true);
    if (clicked) {
      document.querySelectorAll(".chessCell").forEach((cell) => {
        cell.classList.remove("highlight");
      });
      return;
    }
    const tempCells = PossibleMovesForKnight(
      knightPosition.x,
      knightPosition.y
    );
    tempCells.forEach((tempCell) => {
      document
        .querySelector(`[data-cell="${tempCell.join("")}"]`)
        ?.classList?.add("highlight");
    });
  };
  const PossibleMovesForKnight = (x, y) => {
    const possibleMoves = [
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
    ];

    possibleMoves.filter(
      (move) => move[0] < 8 && move[0] >= 0 && move[1] < 8 && move[1] >= 0
    );
    return possibleMoves;
  };

  const handleMove = (e) => {
    if (e.target.classList.contains("highlight")) {
      const cell = e.target.dataset.cell;
      const [x, y] = [cell[0], cell[1]];
      setKnightPosition({ x: parseInt(x), y: parseInt(y) });
    }
    handleClick();
  };

  return (
    <>
      <main className="main">
        <div className="wrapper">
          <div className="chessboard">
            {[...Array(8)].map((_, i) => {
              return [...Array(8)].map((_, j) => (
                <ChessCell
                  setKnightPosition={setKnightPosition}
                  handleMove={handleMove}
                  dataCell={`${String(i)}${String(j)}`}
                />
              ));
            })}
          </div>
          <div
            style={{
              top: `${1.5 + knightPosition.x * cellSize}rem`,
              left: `${1.5 + knightPosition.y * cellSize}rem`,
            }}
            onClick={() => {
              handleClick();
            }}
            id="knight-now"
          >
            &#9822;
          </div>
        </div>
      </main>
    </>
  );
}

const ChessCell = ({ dataCell, handleMove }) => (
  <div
    onClick={(e) => {
      handleMove(e);
    }}
    data-cell={dataCell}
    className="chessCell"
  ></div>
);

export default ChessBoard;
