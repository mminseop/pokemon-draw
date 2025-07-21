function PokemonImageView({ imageSrc, koreaName, view, setView }) {
  return (
    <div className="flex flex-col items-center w-full md:w-1/2">
      <img
        src={imageSrc}
        alt={koreaName}
        className="w-52 h-52 object-contain"
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setView("front")}
          className={`cursor-pointer flex items-center gap-1 px-4 py-2 rounded-full border ${
            view === "front" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          앞면
        </button>
        <button
          onClick={() => setView("back")}
          className={`cursor-pointer flex items-center gap-1 px-4 py-2 rounded-full border ${
            view === "back" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          뒷면
        </button>
      </div>
    </div>
  );
}

export default PokemonImageView;