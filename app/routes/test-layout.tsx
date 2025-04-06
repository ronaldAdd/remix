import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TestLayout() {
  // State untuk menyimpan index gambar yang aktif
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gambar carousel
  const images = [
    "https://miro.medium.com/v2/resize:fit:1400/1*dwLGnkgwmMSU7XN7Yojo1g.png",
    "https://www.pixelstalk.net/wp-content/uploads/2016/05/Cool-Sea-Moon-Night-Time-Full-Screen-HD-Wallpaper.jpg",
    "https://wallpapersok.com/images/hd/horizon-full-screen-hd-desktop-nsw7v8luhapdp6gs.jpg"
  ];

  // Fungsi untuk berpindah ke gambar berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fungsi untuk berpindah ke gambar sebelumnya
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Menambahkan JavaScript setelah komponen di-render
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Section 1: Carousel Image */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Image Carousel</h2>
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-lg">
            <div className="relative">
              {/* Image */}
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-auto object-cover"
              />

              {/* Next Button */}
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={nextSlide}
              >
                Next
              </button>

              {/* Prev Button */}
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={prevSlide}
              >
                Prev
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 4 Columns */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Lorem Ipsum Section</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Column 1 */}
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-2">Column 1</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Column 2 */}
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-2">Column 2</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Column 3 */}
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-2">Column 3</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Column 4 */}
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-2">Column 4</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
