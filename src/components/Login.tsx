import { useState } from 'react';
import { Heart } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - any username/password works for demo
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDE7F0] to-[#E8F2FF]">
      <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md">
        {/* Hospital Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-[#C2185B] rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-center mb-2">MANJUNATHA MATERNITY HOME AND SURGICAL CENTER</h1>
          <p className="text-center text-sm">Admin System</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#C2185B] text-white rounded-lg hover:bg-[#9C1549] transition-colors shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs mt-8 text-gray-500">
          Demo: Use any username and password to login
        </p>
      </div>
    </div>
  );
}
