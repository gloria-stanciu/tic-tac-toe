import { useEffect, useState } from "react";
import Button from "./Button";

export default function Gameboard(props: { size: number }) {
  const [board, setBoard] = useState<Array<Array<string>>>([[]]);
  const [player, setPlayer] = useState(false); //false is first player and true is second player
  const [gameWon, setGameWon] = useState<Boolean>(false)
  const [valuePos, setValuePos] = useState<[number, number]>()

  function CreateBoard() {
    const newBoard = Array(props.size).fill(new Array(props.size).fill(""));
    setBoard(newBoard);
  }

  function UpdateGame(idRow: number, idCol: number){
    AddValue(idRow, idCol)
    CheckLine(idRow)
    // CheckForWin(idRow, idCol)
  }

  function AddValue(idRow: number, idCol: number) {
    let value = "";
    if (player) value = "0";
    else value = "X";
    
    setValuePos([idRow, idCol])
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

  function CheckLine(rowId: number){
    let numberOfX = 0;
    let numberOf0 = 0;
    for(let i=0; i<board.length; i++){
      if(board[rowId][i].toString() === 'X'){
        numberOfX ++;
        console.log(numberOfX)
      }else if(board[rowId][i].toString() === '0'){
        numberOf0++;
        console.log(numberOf0)
      }
    }
    if (numberOf0 === board.length || numberOfX === board.length)
      setGameWon(true)
  }

  function CheckColumn(colId: number){
    let numberOfX = 0;
    let numberOf0 = 0;
    for(let i=0; i<board.length; i++){
      if(board[i][colId].toString() === 'X'){
        numberOfX ++;
        console.log(numberOfX)
      }else if(board[i][colId].toString() === '0'){
        numberOf0++;
        console.log(numberOf0)
      }
    }
    if (numberOf0 === board.length-1 || numberOfX === board.length-1)
      setGameWon(true)
  }

  function CheckForWin(row:number, column:number) {
    CheckLine(row)
    CheckColumn(column)
    console.log(gameWon);
    if(gameWon)
      console.log("am castigaaaat")
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
  }

  useEffect(() => {
    CreateBoard();
  }, []);

  useEffect(() => {
    if (valuePos)
      CheckForWin(valuePos?.[0], valuePos?.[1]);
  }, [valuePos]);


  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {board?.map((row, idR) => (
        <div key={idR} className="flex flex-row items-center justify-center">
          {row.map((item, idC) => (
            <Button
              key={idR.toString() + idC.toString()}
              value={item}
              onClick={() => UpdateGame(idR, idC)}
            />
          ))}
        </div>
      ))}
      <button
        type="reset"
        className="bg-white font-medium text-gray-500 border-2 border-slate-300 py-4 px-6 rounded-md outline-none mt-8
      hover:bg-slate-300 hover:text-gray-900"
        onClick={ResetGame}
      >
        Restart game
      </button>
    </div>
  );
}
