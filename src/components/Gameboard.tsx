import { useEffect, useState } from "react";
import Button from "./Button";

export default function Gameboard(props: { size: number }) {
  const [board, setBoard] = useState<Array<Array<string>>>([[]]);

  function CreateBoard() {
    const newBoard = Array(props.size).fill(new Array(props.size).fill(""));
    setBoard(newBoard);
  }

  function AddValue() {}

  useEffect(() => {
    CreateBoard();
  }, []);

  return (
    <div className="w-screen">
      {board?.map((row, idI) => (
        <div key={idI}>
          {row.map((item, idY) => (
            <Button
              key={idI.toString() + idY.toString()}
              value={item}
              onClick={AddValue}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
