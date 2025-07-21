export const typeColor = (type) => {
  switch (type) {
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-500";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-400 text-black";
    case "psychic":
      return "bg-pink-500";
    case "ice":
      return "bg-cyan-300 text-black";
    case "dragon":
      return "bg-purple-700";
    case "dark":
      return "bg-gray-800";
    case "fairy":
      return "bg-pink-300 text-black";
    case "normal":
      return "bg-gray-400 text-black";
    case "flying":
      return "bg-indigo-300 text-black";
    case "bug":
      return "bg-lime-500 text-black";
    case "poison":
      return "bg-purple-500";
    case "ground":
      return "bg-yellow-600";
    case "rock":
      return "bg-yellow-800";
    case "ghost":
      return "bg-indigo-700";
    case "steel":
      return "bg-gray-500";
    case "fighting":
      return "bg-orange-600";
    default:
      return "bg-gray-300 text-black";
  }
};
