import { getRegExp } from "korean-regexp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchPokemonList } from "../RTK/pokemonSlice";
import PokemonCard from "../components/PokemonCard";
import { ClipLoader } from "react-spinners";

function Search() {
  const [params] = useSearchParams();
  const query = params.get("pokemon") || "";
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { list: pokemonList, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (query === "") {
      navigator("/");
    }
  }, [query, navigator]);

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList(151));
    }
  }, [dispatch, pokemonList.length]);

  const searchPokemonList = pokemonList.filter((item) =>
    getRegExp(query).test(item.koreaName)
  );

  if (loading)
    return (
      <>
        <div className="flex justify-center items-center h-30">
          <ClipLoader color="#333" size={30} />
        </div>
        <div className="text-gray-700 text-2xl">포켓몬을 불러오는 중...</div>
      </>
    );
    if (searchPokemonList.length === 0 ) {
        return (
            <div className="text-gray-700 text-3xl m-[20%]">포켓몬이 없습니다.</div>
        )
    }
  return (
    <section className="flex justify-center px-6 py-8 bg-gray-50">
      <div className="flex flex-wrap gap-6 justify-start max-w-[1100px]">
        {searchPokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
}

export default Search;
