import { useNavigate } from 'react-router-dom';

export default function CartSidebar({ cart, onRemove, onQuantityChange, total }) {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/order', {
      state: {
        cart,
        total
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div>
                <button
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  className="px-2"
                >
                  -
                </button>
                <button
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  className="px-2"
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="ml-2 text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <p className="text-lg font-bold">Total: ₹{total.toFixed(2)}</p>
        <button
          onClick={handleProceed}
          disabled={cart.length === 0}
          className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50"
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
}
