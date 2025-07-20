import MenuCard from './MenuCard';
import { useState } from 'react';

export default function MenuSection({ title, items, onAddToCart }) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, qty) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));
  };

  return (
    <section className="mb-16">
      {/* Section Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 border-b-4 border-orange-500 inline-block pb-2 mb-8 tracking-tight">
        {title}
      </h2>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            quantity={quantities[item.id] || 1}
            onQuantityChange={handleQuantityChange}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
