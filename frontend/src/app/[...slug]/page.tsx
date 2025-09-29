// src/app/[...slug]/page.tsx
import Link from 'next/link';
import type { FC } from 'react';

const CatchAllPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        It seems you've followed a broken link or entered a URL that doesn't exist.
      </p>
      <Link href="/" className="mt-8 px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
        Return to Homepage
      </Link>
    </div>
  );
};

export default CatchAllPage;