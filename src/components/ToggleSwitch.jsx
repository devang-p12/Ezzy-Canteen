// src/components/ToggleSwitch.jsx
export default function ToggleSwitch({ isAdmin, setIsAdmin }) {
  return (
    <div className="mb-4 flex items-center space-x-2">
      <span>User</span>
      <label className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
          className="opacity-0 w-0 h-0 peer"
        />
        <span className="absolute inset-0 bg-gray-400 rounded-full transition peer-checked:bg-green-600 before:absolute before:left-1 before:top-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6" />
      </label>
      <span>Admin</span>
    </div>
  );
}
