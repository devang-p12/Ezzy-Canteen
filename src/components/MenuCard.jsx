export default function MenuCard({ item, quantity, onQuantityChange, onAddToCart }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-xs transition-transform hover:scale-[1.02] hover:shadow-xl duration-200 font-poppins">
      
      {/* Image */}
      <div className="h-40 w-full bg-gray-100 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-lg text-gray-600 mb-4">₹{item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2 w-32 mx-auto mb-4">
          <button
            onClick={() => onQuantityChange(item.id, quantity - 1)}
            className="text-xl text-gray-700 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="text-base font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, quantity + 1)}
            className="text-xl text-gray-700 hover:text-gray-900"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(item, quantity)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full text-sm font-semibold tracking-wide shadow-sm transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
