function PokemonInfoWrap({ height, weight, moves }) {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 grid grid-cols-2 gap-4 text-sm leading-relaxed">
      <div>
        <span className="text-gray-500 font-medium">키</span>:{" "}
        {height ? (height / 10).toFixed(1) + "m" : "알 수 없음"}
      </div>
      <div>
        <span className="text-gray-500 font-medium">몸무게</span>:{" "}
        {weight ? (weight / 10).toFixed(1) + "kg" : "알 수 없음"}
      </div>
      <div className="col-span-2">
        <span className="text-gray-500 font-medium">기술</span>:{" "}
        {moves && moves.length > 0 ? moves.join(" / ") : "정보 없음"}
      </div>
    </div>
  );
}

export default PokemonInfoWrap;
