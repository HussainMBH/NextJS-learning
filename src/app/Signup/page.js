'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [input, setInput] = useState({
    username: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

  const validate = () => {
    let tempErrors = {};
    if (!input.username) tempErrors.username = 'Username is required.';
    if (!input.mobile) {
      tempErrors.mobile = 'Mobile number is required.';
    } else if (!validateMobile(input.mobile)) {
      tempErrors.mobile = 'Invalid mobile number.';
    }
    if (!input.email) {
      tempErrors.email = 'Email address is required.';
    } else if (!validateEmail(input.email)) {
      tempErrors.email = 'Invalid email address.';
    }
    if (!input.password) {
      tempErrors.password = 'Password is required.';
    } else if (input.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long.';
    }
    if (!input.confirmPassword) {
      tempErrors.confirmPassword = 'Confirm password is required.';
    } else if (input.password !== input.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
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
      // Simulate a signup API call
      console.log('Signing up with', input);
      // Redirect to home page on successful signup
      router.push('/home');
    }
  };

  // Ensure the initial state matches on both server and client
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <head>
        <title>Sign Up</title>
      </head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Username"
                  value={input.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  autoComplete="mobile"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Mobile Number"
                  value={input.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email Address"
                  value={input.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={input.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                  value={input.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
               
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
