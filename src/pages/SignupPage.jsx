import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';
import { account } from '../appwrite/appwriteConfig';
import ToggleSwitch from '../components/ToggleSwitch';

export default function SignupPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError('');
    console.log("Trying to sign up with:", { email, password, role: isAdmin ? 'admin' : 'user' });

    try {
      // 1. Create user
      await account.create(ID.unique(), email, password);

      // 2. Login to assign role
      await account.createEmailSession(email, password);

      // 3. Update preferences (role)
      await account.updatePrefs({ role: isAdmin ? 'admin' : 'user' });

      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
          console.error("Signup failed:", err); // 👈 See full Appwrite error object
        setError(err?.message || 'Signup failed. Please try again.');
    }

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Ezzy Canteen - Sign Up</h1>
      <ToggleSwitch isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      <form onSubmit={handleSignup} className="bg-white p-6 shadow rounded w-full max-w-md space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 8 characters)"
          className="w-full px-3 py-2 border rounded"
          required
          minLength={8}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 w-full rounded hover:bg-orange-600 transition"
        >
          Sign Up as {isAdmin ? 'Admin' : 'User'}
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 underline">Login here</a>
      </p>
    </div>
  );
}
