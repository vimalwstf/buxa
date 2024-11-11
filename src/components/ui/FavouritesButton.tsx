import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaStar } from "react-icons/fa6";

export default function FavouritesButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const favouritesON = params.get("favourites") === "true";

  const toggleFavourite = () => {
    if (favouritesON) {
      params.delete("favourites");
    } else {
      params.set("favourites", "true");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      onClick={toggleFavourite}
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
