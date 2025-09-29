"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
export default function LoginPage() {

  const {login}=useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // This is the backend URL where the data will be sent.
    // Replace this with your actual API endpoint.(render, vercel)
    const backendUrl = 'http://localhost:3000/users/signin';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Try to get a meaningful error from the backend response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please check your credentials.');
      }

      // If login is successful
      const data = await response.json();
      // console.log('Login successful: at login page ', data.access_token);
      login(data.access_token);
      // alert('Login successful!');
      
      // Optionally, redirect to a dashboard or home page
      router.push('/');

    } catch (err: any) {
      console.error('An error occurred:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="flex items-center justify-center min-h-[85vh]  text-[#D0E6FA]">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800/20 rounded-xl shadow-lg backdrop-blur-sm !bg-[#253D61]">
        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-gray-400">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Mail'
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-[#ADCEEB] focus:border-[#ADCEEB] sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-[#ADCEEB] focus:border-[#ADCEEB] sm:text-sm"
            />
          </div>

          {error && (
            <div className="p-3 text-center text-sm text-red-400 bg-red-900/30 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#253D61] transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#ADCEEB' }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}