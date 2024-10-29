"use client";

import { BsBell } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import { MdManageSearch } from "react-icons/md";

const data = {
  write: {
    icon: FaPenNib,
    text: "Write for me",
    loading: "Writing...",
  },
  research: {
    icon: MdManageSearch,
    text: "Write for me",
    loading: "Researching...",
  },
  alert: {
    icon: BsBell,
    text: "Write for me",
    loading: "Creating Alert...",
  },
};

export default function SidebarSubmit({
  variant,
  disabled,
  loading,
}: {
  variant: "write" | "research" | "alert";
  disabled: boolean;
  loading: boolean;
}) {
  const btn = data[variant];
  console.log(disabled, loading);

  return (
    <button
      className={`flex gap-2 justify-center items-center cursor-pointer w-full px-4 py-2 mt-8 font-semibold rounded-md
        ${
          disabled || loading
            ? "bg-text-third text-white hover:cursor-not-allowed"
            : "bg-primary-green text-black"
        }
        `}
      type="submit"
      disabled={disabled || loading}
    >
      <btn.icon
        className={`text-lg ${disabled || loading ? "text-white" : " text-black "}`}
      />
      {loading ? btn.loading : btn.text}
    </button>
  );
}
