interface PublishSubmitProps {
  disabled: boolean;
  loading: boolean;
}

const PublishSubmit = ({ disabled, loading }: PublishSubmitProps) => {
  return (
    <button
      className={`disabled:bg-gray-50 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:shadow-lg ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {loading ? "Loading..." : "Submit"}
    </button>
  );
};

export default PublishSubmit;
