import { Link, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";

function Header() {
  const navigator = useNavigate();
  const handleSearch = (e) => {
    const value = e.target.value;
    // console.log(value);
    navigator(`/search?pokemon=${value}`);
  };

  return (
    <header className="w-full bg-white shadow-sm py-6 px-6">
      {/* 상단 제목 */}
      <div className="text-center mb-6">
        <Link
          to="/"
          className="text-4xl font-bold text-gray-600 hover:text-blue-400 transition"
        >
          포켓몬 도감 미니 프로젝트
        </Link>
      </div>

      <div className="w-full relative flex items-center m-3">
        {/* 절대 위치로 가로 중앙에 놓기 */}
        <input
          type="text"
          placeholder="포켓몬 이름을 입력하세요..."
          className="absolute left-1/2 transform -translate-x-1/2 w-[50%] h-12 px-2 text-base border border-blue-300 rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleSearch}
        />

        {/* 오른쪽 정렬 위해 ml-auto */}
        <Link
          to="/favorites"
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-200 transition"
        >
          <HeartIcon className="w-5 h-5 text-red-500" />
          <span className="text-red-600 font-medium">찜 목록</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
