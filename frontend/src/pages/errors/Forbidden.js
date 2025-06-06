import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-yellow-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">دسترسی غیرمجاز</h2>
        <p className="text-gray-600 mb-6">
          متأسفانه شما مجوز دسترسی به این صفحه را ندارید.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default Forbidden; 