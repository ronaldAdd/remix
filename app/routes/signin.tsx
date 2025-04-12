import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Tipe untuk form input
interface LoginForm {
  username: string;
  password: string;
}

export default function Signin() {
  // State dengan tipe LoginForm
  const [formData, setFormData] = useState<LoginForm>({
    username: '',
    password: ''
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Menghandle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Menghandle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: formData.username,
        password: formData.password,
      });

      // Simpan token di localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect ke dashboard setelah login sukses
      console.log(response,'response');
      
      // navigate('/dashboard');
    } catch (err) {
      setError('Login gagal. Cek kredensial Anda.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Belum punya akun?{' '}
          <a href="/register" className="text-blue-500 hover:text-blue-600">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}
