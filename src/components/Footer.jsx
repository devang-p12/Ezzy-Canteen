export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left: Branding & Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">CanteenX</h2>
          <p className="text-sm text-gray-400">© 2025 CanteenX. All rights reserved.</p>
        </div>

        {/* Center: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">📍 VIT Pune, Cafeteria Block</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ support@canteenx.com</p>
        </div>

        {/* Right: Quick Links or Social (optional) */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="/menu" className="hover:text-green-400 transition">Menu</a></li>
            <li><a href="/orders" className="hover:text-green-400 transition">Your Orders</a></li>
            <li><a href="/contact" className="hover:text-green-400 transition">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
