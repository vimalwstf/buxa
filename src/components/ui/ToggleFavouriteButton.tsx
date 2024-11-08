import { toggleFavourite } from "@/actions/favourite";
import useLocalStorage from "@/hooks/useLocalStorage";
import { snackBar } from "@/lib/utils";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export default function ToggleFavouriteButton({
  id,
  isFavourite,
  onToggle,
}: {
  id: string;
  isFavourite: boolean;
  onToggle: (id: string) => void;
}) {
  const [favourite, setFavourite] = useState(isFavourite);

  const { value: user } = useLocalStorage("user", { accessToken: "" });
  const accessToken = user?.accessToken;

  const handleFavouriteToggle = async () => {
    if (!accessToken) return;

    const newFavouriteState = !favourite;
    setFavourite(newFavouriteState);

    try {
      const res = await toggleFavourite(accessToken, id);

      if (res.status) {
        onToggle(id);
      } else {
        setFavourite(favourite);
        snackBar(String(res), "error");
        console.error(res);
      }
    } catch (error) {
      snackBar("Failed to update favourite", "error");
      setFavourite(favourite);
      console.error("Error toggling favourite", error);
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        handleFavouriteToggle();
      }}
      className="w-full h-full flex items-center justify-center"
    >
      {favourite ? (
        <FaStar
          size={18}
          className="text-primary-green hover:text-primary-green/80"
        />
      ) : (
        <FaRegStar
          size={18}
          className="text-white hover:text-primary-green/80"
        />
      )}
    </button>
  );
}
