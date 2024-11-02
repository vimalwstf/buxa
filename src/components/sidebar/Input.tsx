export default function Input({
  label,
  value,
  setValue,
  placeholder,
}: {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-text-third font-medium mb-2 text-lg">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border font-medium text-sm text-gray-100 border-gray-200 rounded-md outline-none bg-transparent"
      />
    </div>
  );
}
