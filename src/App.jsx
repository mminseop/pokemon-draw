import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import { ClipLoader } from "react-spinners";

const Main = lazy(() => import("./pages/Main"));
const Detail = lazy(() => import("./pages/Detail"));
const Search = lazy(() => import("./pages/Search"));
const Favorites = lazy(() => import("./pages/Favorites"));

const App = () => {
  return (
    <>
      <Header />

      <Suspense
        fallback={
          <>
            <div className="flex justify-center items-center h-30">
              <ClipLoader color="#333" size={30} />
            </div>
            <div className="text-gray-700 text-2xl">
              페이지를 로딩중...
            </div>
          </>
        }
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
