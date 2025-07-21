import { typeColor } from "../utils/typeColor";

function PokemonTypeWrap({ types }) {
  return (
    <div className="flex gap-2 mt-2 flex-wrap justify-center">
      {types.map((type) => (
        <span
          key={type}
          className={`px-2 py-1 text-xs rounded-full text-white capitalize ${typeColor(type)}`}
        >
          {type}
        </span>
      ))}
    </div>
  );
}

export default PokemonTypeWrap;