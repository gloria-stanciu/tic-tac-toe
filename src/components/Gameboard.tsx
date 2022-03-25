import { useEffect, useState } from "react";
import Button from "./Button";

export default function Gameboard(props: { size: number }) {
  const [board, setBoard] = useState<Array<Array<string>>>([[]]);
  const [player, setPlayer] = useState(false); //false is first player and true is second player
  // const [isEqual, setIsEqual] = useState<Boolean | undefined>()

  function CreateBoard() {
    const newBoard = Array(props.size).fill(new Array(props.size).fill(""));
    setBoard(newBoard);
  }

  function AddValue(idRow: number, idCol: number) {
    let value = "";
    if (player) value = "0";
    else value = "X";

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

  function CheckForWin(){
    let isEqual;
    for(let i=0; i<board.length; i++){
      isEqual = true;
      for(let j=0; j<board.length-1; j++){
        if(board[i][j] !== board[i][j+1])
        {
          isEqual = false;
        }
      }
      if(isEqual) return isEqual
    }
    return false
  }

  function ResetGame(){
    setBoard((prevState) => {
      const newMatrix = prevState.map((arr, idR) => {
        const newRow = arr.map((item, idC) => {
            item = '';
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
    const res = CheckForWin();
    console.log(res)
  }, [player]);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {board?.map((row, idR) => (
        <div key={idR} className="flex flex-row items-center justify-center">
          {row.map((item, idC) => (
            <Button
              key={idR.toString() + idC.toString()}
              value={item}
              onClick={() => AddValue(idR, idC)}
            />
          ))}
        </div>
      ))}
      <button type="reset"
        className="bg-white font-medium text-gray-500 border-2 border-slate-300 py-4 px-6 rounded-md outline-none mt-8
      hover:bg-slate-300 hover:text-gray-900"
      onClick={ResetGame}
      >
        Restart game
      </button>
    </div>
  );
}
