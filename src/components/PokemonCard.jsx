import { Link } from "react-router-dom";
import { typeColor } from "../utils/typeColor";

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/detail/${pokemon.id}`}>
      <div className="w-48 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center">
        <img
          src={pokemon.front}
          alt={pokemon.name}
          className="w-24 h-24 object-contain mb-3"
        />
        <h2 className="text-lg font-semibold capitalize text-gray-800">
          {pokemon.koreaName}
        </h2>
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-2 py-1 text-xs rounded-full text-white capitalize ${typeColor(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;