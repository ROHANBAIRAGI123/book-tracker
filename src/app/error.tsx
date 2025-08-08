"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="text-center max-w-md">
        {/* Minimal error indicator */}
        <div className="w-16 h-16 mx-auto mb-8 border-2 border-red-500/20 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h2 className="text-xl text-gray-100 mb-4">Something went wrong</h2>

        <p className="text-gray-400 text-sm mb-8">
          Unable to load the requested content
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-8 text-left">
            <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-400 mb-3">
              Error details
            </summary>
            <pre className="bg-gray-900 border border-gray-800 p-3 rounded text-xs overflow-auto text-red-400 font-mono">
              {error.message}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-100 py-3 px-6 rounded border border-gray-700 transition-colors duration-200"
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full text-gray-400 hover:text-gray-300 py-3 px-6 transition-colors duration-200 text-sm"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
