import { useEffect, useState } from "react";

export default function TestSelect() {
  // State untuk menampung data dropdown dan pilihan pengguna
  const [provinces, setProvinces] = useState<any[]>([]);
  const [regencies, setRegencies] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  // Mengambil data provinsi dari API
  useEffect(() => {
    fetch("https://api.jcamp.net/api/v1/reference/provinces")
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  // Mengambil data kabupaten/kota berdasarkan ID provinsi
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://api.jcamp.net/api/v1/reference/regencies_of/${selectedProvince}`)
        .then((response) => response.json())
        .then((data) => setRegencies(data))
        .catch((error) => console.error("Error fetching regencies:", error));
    } else {
      setRegencies([]);
    }
  }, [selectedProvince]);

  // Mengambil data kecamatan berdasarkan ID kabupaten/kota
  useEffect(() => {
    if (selectedRegency) {
      fetch(`https://api.jcamp.net/api/v1/reference/districts_of/${selectedRegency}`)
        .then((response) => response.json())
        .then((data) => setDistricts(data))
        .catch((error) => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
    }
  }, [selectedRegency]);

  // Mengambil data desa berdasarkan ID kecamatan
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://api.jcamp.net/api/v1/reference/villages_of/${selectedDistrict}`)
        .then((response) => response.json())
        .then((data) => setVillages(data))
        .catch((error) => console.error("Error fetching villages:", error));
    } else {
      setVillages([]);
    }
  }, [selectedDistrict]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Select Form</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Provinsi Select */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="province">
            Provinsi
          </label>
          <select
            id="province"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((province: any) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* Kab/Kota Select */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="regency">
            Kab/Kota
          </label>
          <select
            id="regency"
            value={selectedRegency}
            onChange={(e) => setSelectedRegency(e.target.value)}
            className="p-2 border rounded-md"
            disabled={!selectedProvince}
          >
            <option value="">Pilih Kab/Kota</option>
            {regencies.map((regency: any) => (
              <option key={regency.id} value={regency.id}>
                {regency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Kecamatan Select */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="district">
            Kecamatan
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="p-2 border rounded-md"
            disabled={!selectedRegency}
          >
            <option value="">Pilih Kecamatan</option>
            {districts.map((district: any) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* Desa Select */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="village">
            Desa
          </label>
          <select
            id="village"
            value=""
            onChange={() => {}}
            className="p-2 border rounded-md"
            disabled={!selectedDistrict}
          >
            <option value="">Pilih Desa</option>
            {villages.map((village: any) => (
              <option key={village.id} value={village.id}>
                {village.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
