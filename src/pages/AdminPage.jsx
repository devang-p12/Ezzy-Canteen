import { useEffect, useState } from 'react';
import { client, databases, DB_ID , COLLECTION_ID } from '../appwrite/appwriteConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statuses, setStatuses] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await databases.listDocuments(DB_ID, COLLECTION_ID);
      setOrders(res.documents);

      // Set initial status from DB
      const initialStatus = {};
      res.documents.forEach(doc => {
        initialStatus[doc.$id] = doc.status === 'done';
      });
      setStatuses(initialStatus);
    } catch (err) {
      console.error(err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // ✅ Set up Appwrite realtime subscription
    const unsubscribe = client.subscribe(
      [`databases.${DB_ID}.collections.${COLLECTION_ID}.documents`],
      (response) => {
        console.log("📡 Realtime update:", response.events);
        fetchOrders(); // Re-fetch orders on any DB change
      }
    );

    return () => {
      unsubscribe(); // cleanup
    };
  }, []);

  // ✅ Toggle status and update in DB
  const toggleStatus = async (id) => {
    const newStatus = !statuses[id];
    try {
      await databases.updateDocument(DB_ID, COLLECTION_ID, id, {
        status: newStatus ? 'done' : 'pending',
      });

      setStatuses(prev => ({
        ...prev,
        [id]: newStatus,
      }));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
  <Navbar />

  <main className="flex-grow p-6 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-green-800">Admin Panel – Orders</h1>

    {loading && <p className="text-gray-600">Loading orders...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {!loading && orders.length === 0 && <p className="text-gray-600">No orders found.</p>}

    {!loading && orders.length > 0 && (
      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
        <table className="min-w-full table-auto text-sm text-gray-800">
          <thead className="bg-green-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              {/* <td className="px-6 py-4">{orders.email || 'N/A'}</td> ✅ Add this below Order ID */}
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">DOB</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Subtotal</th>
              <th className="px-6 py-3 text-left">GST</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              const items = JSON.parse(order.items || '[]');
              const isDone = statuses[order.$id];
              return (
                <tr
                  key={order.$id}
                  className={`border-t transition duration-150 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } ${isDone ? 'line-through text-gray-400' : ''}`}
                >
                  <td className="px-6 py-4">{order.$id}</td>
                  {/* <td className="px-6 py-4">{order.email || 'N/A'}</td> */}
                  <td className="px-6 py-4">{order.name || 'N/A'}</td>
                  <td className="px-6 py-4">{order.dob || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc pl-4 space-y-1">
                      {items.map((item, index) => (
                        <li key={index}>
                          {item.name} × {item.quantity} – ₹
                          {(item.quantity * item.price).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">₹{order.subtotal.toFixed(2)}</td>
                  <td className="px-6 py-4">₹{order.gst.toFixed(2)}</td>
                  <td className="px-6 py-4 font-semibold">₹{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={statuses[order.$id] || false}
                        onChange={() => toggleStatus(order.$id)}
                        className="accent-green-600"
                      />
                      <span>{statuses[order.$id] ? 'Done' : 'Pending'}</span>
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </main>

  <Footer />
</div>

  );
}
