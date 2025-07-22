import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPokemonList, selectFavoriteIds } from "../RTK/pokemonSlice";
import PokemonCard from "../components/PokemonCard";

function Favorite() {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const { list } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, list.length]);

  const favoritePokemons = list.filter((p) => favoriteIds.includes(p.id));

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">찜한 포켓몬</h2>
      {favoritePokemons.length === 0 ? (
        <p className="text-gray-500">찜한 포켓몬이 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start max-w-[1100px]">
          {favoritePokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorite;
