export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="text-center">
        {/* Minimalist book stack loader */}
        <div className="flex justify-center space-x-1 mb-8">
          <div className="w-3 h-8 bg-gray-600 rounded-sm animate-pulse"></div>
          <div className="w-3 h-10 bg-gray-500 rounded-sm animate-pulse delay-75"></div>
          <div className="w-3 h-6 bg-gray-400 rounded-sm animate-pulse delay-150"></div>
        </div>

        {/* Simple loading dots */}
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
        </div>

        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
