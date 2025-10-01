"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// Define a type for our form errors for better type-checking
type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
};

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  // --- Client-side validation logic ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Username validation: No special characters
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores.';
    }

    // Password validation: Minimum 8 characters
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    // Phone validation: Exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(newErrors);
    // Return true if the errors object is empty
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    // Run validation before submitting
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop the submission if validation fails
    }

    setIsLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

    const backendUrl = `${apiUrl}/users/signup`;

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone, // Send only the 10-digit number
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign-up failed. Please try again.');
      }

      const data = await response.json();
      // const data1= await JSON.parse(data)
      // console.log('Sign-up successful:', data);
      setSuccessMessage('Account created successfully! You can now log in.');

      // Optionally, clear form or redirect
      router.push('/login');

    } catch (err: any) {
      console.error('An error occurred:', err);
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="flex items-center justify-center min-h-screen  text-[#D0E6FA]"
    >
      <div className="w-full max-w-md p-8 space-y-4 rounded-xl shadow-lg !bg-[#253D61]">
        <h1 className="text-3xl font-bold text-center">
          Create an Account
        </h1>
        <p className="text-center text-sm text-gray-400">
          Join us today! It's quick and easy.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* --- Username Input --- */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              id="username" name="username" type="text" required
              value={username} onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-[#ADCEEB] focus:border-[#ADCEEB]"
            />
            {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username}</p>}
          </div>

          {/* --- Email Input --- */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
            <input
              id="email" name="email" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-[#ADCEEB] focus:border-[#ADCEEB]"
            />
          </div>
          
          {/* --- Phone Input --- */}
          <div>
              <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700/50 text-gray-400 sm:text-sm">
                    +91
                  </span>
                  <input
                      id="phone" name="phone" type="tel" autoComplete="tel" required
                      value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 block w-full min-w-0 px-3 py-2 bg-transparent border border-gray-600 rounded-none rounded-r-md focus:outline-none focus:ring-[#ADCEEB] focus:border-[#ADCEEB]"
                  />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
          </div>


          {/* --- Password Input --- */}
          <div>
            <label htmlFor="password"className="block text-sm font-medium">Password</label>
            <input
              id="password" name="password" type="password" autoComplete="new-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-[#ADCEEB] focus:border-[#ADCEEB]"
            />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
          </div>

          {/* --- API Error & Success Messages --- */}
          {apiError && <div className="p-3 text-center text-sm text-red-400 bg-red-900/30 rounded-md">{apiError}</div>}
          {successMessage && <div className="p-3 text-center text-sm text-green-400 bg-green-900/30 rounded-md">{successMessage}</div>}

          {/* --- Submit Button --- */}
          <div>
            <button
              type="submit" disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#253D61] transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#ADCEEB' }}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}