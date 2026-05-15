"use client";

export default function SearchBar({
  value,
  onChange,
}) {

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search jobs by title or keyword..."
        className="w-full border border-gray-300 rounded-2xl px-6 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}