import { FaStar } from "react-icons/fa6";

export default function FavouritesButton({
  favouritesON,
  setFavouritesON,
}: {
  favouritesON: boolean;
  setFavouritesON: (b: boolean) => void;
}) {
  return (
    <button
      onClick={() => setFavouritesON(!favouritesON)}
      className={`${
        favouritesON
          ? "bg-primary-green text-black"
          : "bg-secondary-default text-white"
      }  px-4 py-2 rounded-md shadow-md flex items-center  hover:cursor-pointer`}
    >
      <FaStar className="inline sm:mr-2" />
      <span className="sr-only sm:not-sr-only">Favourites</span>
    </button>
  );
}
