export default function Button(props: {
  value: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="w-20 aspect-square bg-slate-300 rounded-md m-1
      sm:w-24
      md:w-36
      lg:w-40
      xl:w-48
      "
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
