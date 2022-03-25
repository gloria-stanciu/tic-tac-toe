export default function Button(props: {
  gameWon: "X" | "0" | undefined;
  value: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`w-20 aspect-square bg-slate-300 rounded-md m-1 text-gray-800 font-semibold text-lg
      sm:w-24 sm:text-xl
      md:w-36 md:text-6xl
      lg:w-40 lg:text-3xl
      xl:w-48 xl:text-4xl
       ${props.gameWon ? "cursor-not-allowed" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
