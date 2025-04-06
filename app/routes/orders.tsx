import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'; // Import Sidebar component

interface Order {
  orderId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: string;
  date: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]); // Orders state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [newOrder, setNewOrder] = useState({
    productName: '',
    quantity: 1,
    totalAmount: 0,
  }); // New order form state
  const [formError, setFormError] = useState<string>(''); // Form error message
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Dummy data for orders
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders([
        {
          orderId: '001',
          productName: 'Laptop',
          quantity: 1,
          totalAmount: 1200,
          status: 'Shipped',
          date: '2025-04-06',
        },
        {
          orderId: '002',
          productName: 'Smartphone',
          quantity: 2,
          totalAmount: 1400,
          status: 'Pending',
          date: '2025-04-05',
        },
        {
          orderId: '003',
          productName: 'Headphones',
          quantity: 1,
          totalAmount: 300,
          status: 'Delivered',
          date: '2025-04-04',
        },
      ]);
      setLoading(false);
    }, 2000); // Simulate data loading delay
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation: Ensure productName and quantity are filled out
    if (!newOrder.productName || newOrder.quantity <= 0) {
      setFormError('Please provide a valid product name and quantity.');
      return;
    }

    // Generate a new order ID
    const newOrderId = (orders.length + 1).toString().padStart(3, '0');
    const totalAmount = newOrder.quantity * 100; // Dummy price calculation: $100 per item

    const newOrderData = {
      orderId: newOrderId,
      productName: newOrder.productName,
      quantity: newOrder.quantity,
      totalAmount,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
    };

    // Add new order to the orders list
    setOrders([...orders, newOrderData]);

    // Close modal and clear form
    setIsModalOpen(false);
    setNewOrder({ productName: '', quantity: 1, totalAmount: 0 });
    setFormError(''); // Clear any previous error message
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isAdmin={false} />

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {/* Hamburger menu for mobile sidebar toggle */}
            <button
              className="md:hidden text-blue-600 focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h2 className="text-3xl font-semibold text-blue-600 ml-4">Your Orders</h2>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login'; // Redirect to login when logging out
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>

        {/* Button to open modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-6"
        >
          Place a New Order
        </button>

        {/* Orders Table */}
        {loading ? (
          <p className="text-gray-500">Loading your orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-800">Order ID</th>
                  <th className="py-2 px-4 border-b text-left text-gray-800">Product</th>
                  <th className="py-2 px-4 border-b text-left text-gray-800">Quantity</th>
                  <th className="py-2 px-4 border-b text-left text-gray-800">Total Amount</th>
                  <th className="py-2 px-4 border-b text-left text-gray-800">Status</th>
                  <th className="py-2 px-4 border-b text-left text-gray-800">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="py-2 px-4 border-b text-gray-800">{order.orderId}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{order.productName}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{order.quantity}</td>
                    <td className="py-2 px-4 border-b text-gray-800">${order.totalAmount}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{order.status}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Order Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl text-black font-semibold mb-4">Place a New Order</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="productName">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="mt-2 p-2 border rounded w-full"
                  value={newOrder.productName}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, productName: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="mt-2 p-2 border rounded w-full"
                  value={newOrder.quantity}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, quantity: +e.target.value })
                  }
                  min="1"
                />
              </div>

              {formError && (
                <p className="text-red-500 text-sm mb-4">{formError}</p>
              )}

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Place Order
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-red-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
