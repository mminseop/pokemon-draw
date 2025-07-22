import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../RTK/pokemonSlice";
import { ClipLoader } from "react-spinners";
import PokemonCard from "../components/PokemonCard";

function Main() {
  const dispatch = useDispatch();
  const { list: pokemonList, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonList(151));
  }, [dispatch]);

  if (loading)
    return (
      <>
        <div className="flex justify-center items-center h-30">
          <ClipLoader color="#333" size={30} />
        </div>
        <div className="text-gray-700 text-2xl">포켓몬을 불러오는 중...</div>
      </>
    );

  return (
    <section className="flex justify-center px-6 py-8 bg-gray-50 mx-auto">
      <div className="flex flex-wrap gap-6 justify-start max-w-[1100px]">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
}

export default Main;
