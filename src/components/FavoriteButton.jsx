import { useDispatch, useSelector } from "react-redux";
import {addToFavorite, removeFromFavorite, selectFavoriteIds} from "../RTK/pokemonSlice";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

function FavoriteButton({ pokemonId }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(pokemonId);

  const handleClick = (e) => {
    e.stopPropagation(); // 상위 카드 클릭 이벤트 방지
    e.preventDefault(); // <Link>의 기본 이동 막기
    if (isFavorite) {
      dispatch(removeFromFavorite(pokemonId));
    } else {
      dispatch(addToFavorite(pokemonId));
    }
  };

  return (
     <button
      onClick={handleClick}
      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:scale-110 transition"
    >
      {isFavorite ? (
        <SolidHeartIcon className="w-6 h-6 text-red-500" />
      ) : (
        <OutlineHeartIcon className="w-6 h-6 text-gray-400" />
      )}
    </button>
  );
}

export default FavoriteButton;
