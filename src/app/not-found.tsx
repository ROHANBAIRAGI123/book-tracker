import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="text-center max-w-lg">
        {/* Minimal 404 with book accent */}
        <div className="mb-8">
          <div className="text-6xl font-light text-gray-800 mb-2">404</div>
          <div className="w-8 h-1 bg-gray-700 mx-auto"></div>
        </div>

        <h1 className="text-2xl font-light text-gray-100 mb-4">
          Page not found
        </h1>

        <p className="text-gray-400 text-sm mb-12">
          The page you're looking for doesn't exist
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-gray-800 hover:bg-gray-700 text-gray-100 py-3 px-8 rounded border border-gray-700 transition-colors duration-200"
          >
            Go home
          </Link>

          <Link
            href="/"
            className="inline-block w-full text-gray-400 hover:text-gray-300 py-3 px-8 transition-colors duration-200 text-sm"
          >
            Browse books
          </Link>
        </div>
      </div>
    </div>
  );
}
