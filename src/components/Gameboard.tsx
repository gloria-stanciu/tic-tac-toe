import { useEffect, useState } from "react";
import Button from "./Button";
import JSConfetti from 'js-confetti'

export default function Gameboard(props: { size: number }) {
  
  
const jsConfetti = new JSConfetti()
  const [board, setBoard] = useState<Array<Array<string>>>([[]]);
  const [player, setPlayer] = useState(false); //false is first player and true is second player
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [valuePos, setValuePos] = useState<[number, number]>();

  function CreateBoard() {
    const newBoard = Array(props.size).fill(new Array(props.size).fill(""));
    setBoard(newBoard);
  }

  function AddValue(idRow: number, idCol: number) {
    if(gameWon) return
    let value = "";
    if (player) value = "0";
    else value = "X";

    setValuePos([idRow, idCol]);
    setBoard((prevState) => {
      const newMatrix = prevState.map((arr, idR) => {
        const newRow = arr.map((item, idC) => {
          if (idRow === idR && idCol === idC && item === "") {
            item = value;
            setPlayer(!player);
          }
          return item;
        });
        return newRow;
      });
      return newMatrix;
    });
  }

  function CheckLine(rowId: number) {
    let numberOfX = 0;
    let numberOf0 = 0;

    for (let i = 0; i < board.length; i++) {
      if (board[rowId][i] === "X") {
        numberOfX++;
      } else if (board[rowId][i] === "0") {
        numberOf0++;
      }
    }
    if (numberOf0 === board.length || numberOfX === board.length)
      setGameWon(true);
  }

  function CheckColumn(colId: number) {
    let numberOfX = 0;
    let numberOf0 = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][colId] === "X") {
        numberOfX++;
      } else if (board[i][colId] === "0") {
        numberOf0++;
      }
    }
    if (numberOf0 === board.length || numberOfX === board.length)
      setGameWon(true);
  }

  function CheckPrimaryDiagonal() {
    let numberOfX = 0;
    let numberOf0 = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][i] === "X") {
        numberOfX++;
      } else if (board[i][i] === "0") {
        numberOf0++;
      }
    }
    if (numberOf0 === board.length || numberOfX === board.length)
      setGameWon(true);
  }

  function CheckSecondaryDiagonal() {
    let numberOfX = 0;
    let numberOf0 = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][board.length - 1 - i] === "X") {
        numberOfX++;
      } else if (board[i][board.length - 1 - i] === "0") {
        numberOf0++;
      }
    }
    if (numberOf0 === board.length || numberOfX === board.length)
      setGameWon(true);
  }

  function CheckForWin(row: number, column: number) {
    CheckLine(row)
    CheckColumn(column);
    CheckPrimaryDiagonal();
    CheckSecondaryDiagonal();
  }

  function ResetGame() {
    setBoard((prevState) => {
      const newMatrix = prevState.map((arr, idR) => {
        const newRow = arr.map((item, idC) => {
          item = "";
          return item;
        });
        return newRow;
      });
      return newMatrix;
    });
    setPlayer(false);
    setGameWon(false)
  }

  useEffect(() => {
    CreateBoard();
  }, []);

  useEffect(() => {
    if (valuePos) CheckForWin(valuePos?.[0], valuePos?.[1]);
  }, [valuePos]);

  useEffect(()=>{
    if(gameWon){
      jsConfetti.addConfetti()
    }
  }, [gameWon])

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {gameWon? <p> You won!</p>: null}
      {board?.map((row, idR) => (
        <div key={idR} className="flex flex-row items-center justify-center">
          {row.map((item, idC) => (
            <Button
              gameWon = {gameWon}
              key={idR.toString() + idC.toString()}
              value={item}
              onClick={() => AddValue(idR, idC)}
            />
          ))}
        </div>
      ))}
      <button
        type="reset"
        className="bg-white text-sm font-medium text-gray-500 border-2 border-slate-300 py-2 px-4 rounded-md outline-none mt-4
        md:py-4 md:px-6 md:mt-8 md:font-medium md:text-base
      hover:bg-slate-300 hover:text-gray-900"
        onClick={ResetGame}
      >
        Restart game
      </button>
    </div>
  );
}
