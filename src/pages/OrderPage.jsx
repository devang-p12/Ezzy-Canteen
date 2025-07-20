import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { account ,DB_ID , COLLECTION_ID ,databases } from '../appwrite/appwriteConfig';
import { ID, Query } from 'appwrite';


const MINUTES_PER_ORDER = 5;

export default function OrderPage() {
  const [estimatedTime, setEstimatedTime] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstRate = 0.18;
  const gstAmount = subtotal * gstRate;
  const total = subtotal + gstAmount;

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
    try {
      const user = await account.get();
      if (!name) setName(user.name || user.email); // only set if name input is empty
    } catch (err) {
      console.error("User not logged in", err);
    }
  };
    const fetchPendingOrders = async () => {
      try {
        const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
          Query.equal("status", ["pending"]),
        ]);
        const pendingCount = res.total;
        setEstimatedTime(pendingCount * MINUTES_PER_ORDER);
      } catch (err) {
        console.error("Error fetching pending orders:", err);
      }
    };
    fetchUser();
    fetchPendingOrders();
  }, []);

  const handleConfirm = async () => {
  try {
    const user = await account.get();

    const orderDoc = {
      name: name || user.name || user.email,
      dob,
      items: JSON.stringify(cart),
      subtotal,
      gst: gstAmount,
      total,
      status: 'pending',
      userEmail: user.email,
    };

    await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      orderDoc
    );

    alert("Order confirmed and saved to database!");
    navigate('/');
  } catch (err) {
    console.error("Error saving order:", err);
    alert("Failed to place order. Please try again.");
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-green-50 to-white font-poppins text-gray-800">
      <Navbar />

      <main className="flex-grow px-4 py-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Order Summary</h1>

        {/* Cart Items Summary */}
<div className="mb-8 bg-white rounded-2xl shadow-lg border border-green-100 px-8 py-6 space-y-5 max-w-2xl mx-auto">
  {cart.map((item) => (
    <div key={item.id} className="flex justify-between border-b pb-2 text-lg">
      <span className="text-gray-800">{item.name} × {item.quantity}</span>
      <span className="text-gray-700">₹{(item.quantity * item.price).toFixed(2)}</span>
    </div>
  ))}
  <div className="pt-4 text-right space-y-1 text-base">
    <p className="text-gray-700">Subtotal: ₹{subtotal.toFixed(2)}</p>
    <p className="text-gray-700">GST (18%): ₹{gstAmount.toFixed(2)}</p>
    <p className="font-semibold text-lg text-gray-900">Total (incl. GST): ₹{total.toFixed(2)}</p>
  </div>

  {estimatedTime !== null && (
    <p className="pt-4 text-blue-700 font-medium text-md">
      Estimated Waiting Time: <span className="font-semibold">{estimatedTime} minute{estimatedTime !== 1 ? 's' : ''}</span>
    </p>
  )}
</div>


        {/* Form */}
        <form className="bg-white shadow rounded-xl p-6 mb-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name (optional)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth (optional)</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </form>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition duration-200"
        >
          Confirm Order
        </button>
      </main>

      <Footer />
    </div>
  );
}
