// src/app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-4xl font-bold mb-4 animate-pulse">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, this page doesn't exist.</p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
      >
        ← Go to Homepage
      </Link>
    </div>
  );
}
