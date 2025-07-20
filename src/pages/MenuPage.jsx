import { useState } from 'react';
import {menuData} from '../data/menuData';
import MenuSection from '../components/MenuSection';
import CartSidebar from '../components/CartSidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MenuPage() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item, quantity) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50 font-poppins text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex flex-col md:flex-row flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 gap-6">
        {/* Left: Menu Sections */}
        <main className="flex-1">
          <h1 className="text-4xl font-bold mb-8 text-orange-600">Our Menu</h1>

          <div className="space-y-10">
            {Object.entries(menuData).map(([section, items]) => (
              <MenuSection
                key={section}
                title={section}
                items={items}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </main>

        {/* Right: Cart Sidebar */}
        <aside className="w-full md:w-96 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-8 h-fit">
          <CartSidebar
            cart={cart}
            onRemove={handleRemoveFromCart}
            onQuantityChange={handleUpdateQuantity}
            total={total}
          />
        </aside>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
