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
      <label className="block text-text-third font-medium mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border font-medium text-[16px] text-gray-100 bg-transparent border-[#2c2c2c] rounded-[8px] outline-none"
      />
    </div>
  );
}
