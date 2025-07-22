import { Link } from "react-router-dom";
import { typeColor } from "../utils/typeColor";
import FavoriteButton from "./FavoriteButton";
import "../App.scss";
import { memo } from "react";

const PokemonCard = memo(function PokemonCard({ pokemon }) {
  console.log("포켓몬카드 렌더링됨:");
  return (
    <Link to={`/detail/${pokemon.id}`}>
      <div className="relative pokemon-card p-4 flex flex-col items-center">
        <div className="absolute top-2 right-2">
          <FavoriteButton pokemonId={pokemon.id} />
        </div>
        <img src={pokemon.front} alt={pokemon.name} className="pokemon-image" />
        <h2 className="pokemon-name capitalize">{pokemon.koreaName}</h2>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-2 py-1 text-xs rounded-full text-white capitalize ${typeColor(
                type
              )}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
});

export default PokemonCard;
