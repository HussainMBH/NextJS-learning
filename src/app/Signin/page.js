'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [input, setInput] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (emailRegex.test(value) || phoneRegex.test(value)) {
      return true;
    }
    return false;
  };

  const validate = () => {
    let tempErrors = {};
    if (!input.identifier) {
      tempErrors.identifier = 'Phone number or email is required.';
    } else if (!validateEmailOrPhone(input.identifier)) {
      tempErrors.identifier = 'Invalid phone number or email.';
    }

    if (!input.password) {
      tempErrors.password = 'Password is required.';
    } else if (input.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate a login API call
      console.log('Logging in with', input);
      // Redirect to home page on successful login
      router.push('/home');
    }
  };

  // Ensure the initial state matches on both server and client
  useEffect(() => {
    setInput({ identifier: '', password: '' });
    setErrors({});
  }, []);

  return (
    <>
      <head>
        <title>Sign In</title>
      </head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="identifier" className="sr-only">Phone number or email</label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="identifier"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.identifier ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Phone number or email"
                  value={input.identifier}
                  onChange={handleChange}
                />
                {errors.identifier && <p className="mt-2 text-sm text-red-600">{errors.identifier}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={input.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
