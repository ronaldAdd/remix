// app/routes/about.tsx
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <div className="my-6">
        <img
          src="https://miro.medium.com/v2/resize:fit:1200/1*xMuIOwjliGUPjkzukeWKfw.jpeg" // Ganti dengan path ke gambar Anda
          alt="Profile Image"
          className="w-full sm:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow-md"
        />
      </div>

      {/* Layout Grid Kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* <img
            src="/path/to/your/image.jpg" // Ganti dengan gambar untuk card
            alt="Card Image"
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          /> */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Frontend</h2>
          <p className="text-gray-600 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to="#" className="text-blue-500 hover:underline">Last updated 5 mins ago</Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* <img
            src="/path/to/your/image.jpg" // Ganti dengan gambar untuk card
            alt="Card Image"
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          /> */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Mockup</h2>
          <p className="text-gray-600 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <p className="text-sm text-gray-500 mb-4">Last updated 5 mins ago</p>
          {/* <Link to="#" className="text-blue-500 hover:underline">Read more</Link> */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* <img
            src="/path/to/your/image.jpg" // Ganti dengan gambar untuk card
            alt="Card Image"
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          /> */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Design</h2>
          <p className="text-gray-600 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <p className="text-sm text-gray-500 mb-4">Last updated 5 mins ago</p>
          {/* <Link to="#" className="text-blue-500 hover:underline">Read more</Link> */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* <img
            src="/path/to/your/image.jpg" // Ganti dengan gambar untuk card
            alt="Card Image"
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          /> */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Test</h2>
          <p className="text-gray-600 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <p className="text-sm text-gray-500 mb-4">Last updated 5 mins ago</p>
          {/* <Link to="#" className="text-blue-500 hover:underline">Read more</Link> */}
      </div>

      </div>
    </div>
  );
}
