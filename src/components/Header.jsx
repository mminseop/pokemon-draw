import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";

function Header() {
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

      {/* 검색창 + 찜 목록 */}
      <div className="w-full flex items-center justify-between m-3">
        {/* 검색창 */}
        <input
          type="text"
          placeholder="포켓몬 이름을 입력하세요..."
          className="w-[50%] h-12 px-2 text-base border border-blue-300 rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => {
            // 비동기 검색 함수 연결 예정
            console.log(e.target.value);
          }}
        />

        {/* 찜 목록 */}
        <Link
          to="/favorites"
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-200 transition ml-auto"
        >
          <HeartIcon className="w-5 h-5 text-red-500" />
          <span className="text-red-600 font-medium">찜 목록</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
