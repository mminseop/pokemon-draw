import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../RTK/pokemonSlice";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PokemonImageView from "../components/pokemonImageView";
import PokemonTypeWrap from "../components/PokemonTypeWrap";
import PokemonInfoWrap from "../components/PokemonInfoWrap";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.pokemon);
  const [view, setView] = useState("front");

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, list]);

  const pokemon = list.find((p) => p.id === Number(id));
  console.log(pokemon);

  // 조건분기
  if (loading)
    return (
      <>
        <div className="flex justify-center items-center h-30">
          <ClipLoader color="#333" size={30} />
        </div>
        <div className="text-gray-700 text-2xl">포켓몬을 불러오는 중...</div>
      </>
    );
  if (error) return <div className="p-4 text-red-500">에러 발생: {error}</div>;
  if (!pokemon) return <div className="p-4">포켓몬을 찾을 수 없습니다.</div>;

  const imageSrc = view === "front" ? pokemon.front : pokemon.back;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <PokemonImageView
          imageSrc={imageSrc}
          koreaName={pokemon.koreaName}
          view={view}
          setView={setView}
        />

        <div className="flex-1 space-y-4 w-full">
          <span className="text-xl text-gray-500">
            No. {String(pokemon.id).padStart(4, "0")}
          </span>
          <h2 className="text-3xl font-bold">{pokemon.koreaName}</h2>
          <p className="text-gray-600">{pokemon.description}</p>

          <PokemonTypeWrap types={pokemon.types} />
          <PokemonInfoWrap
            height={pokemon.height}
            weight={pokemon.weight}
            moves={pokemon.moves}
          />

          <div className="pt-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
