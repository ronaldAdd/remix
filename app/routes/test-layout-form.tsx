import { useState } from "react";

export default function TestLayoutForm() {
  // State untuk menangani input dan dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2020");

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Test Layout Form</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Kolom 1: Tombol */}
        <div className="space-y-4">
          <button className="w-auto px-4 py-2 bg-blue-500 text-white rounded-md">Tambah</button>{' '}
          <button className="w-auto px-4 py-2 bg-green-500 text-white rounded-md">Import</button>{' '}
          <button className="w-auto px-4 py-2 bg-red-500 text-white rounded-md">Export</button>{' '}
        </div>

        {/* Kolom 2: Input Search */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Kolom 3: Dropdown Tahun */}
        <div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
    </div>
  );
}
