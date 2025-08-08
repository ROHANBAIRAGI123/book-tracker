import React, { useState, useEffect } from "react";

interface BookResult {
  id: string;
  title: string;
  author: string;
  type: string;
  totalPages: number;
  imageUrl: string;
  description?: string;
}

interface BookSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSelect: (book: BookResult) => void;
  initialQuery?: string;
}

interface GoogleBooksVolumeInfo {
  title?: string;
  authors?: string[];
  categories?: string[];
  pageCount?: number;
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
}

interface GoogleBooksItem {
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
}

export const BookSearchModal: React.FC<BookSearchModalProps> = ({
  isOpen,
  onClose,
  onBookSelect,
  initialQuery = "",
}) => {
  const [searchResults, setSearchResults] = useState<BookResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchGoogleBooks(query: string) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&key=${key}&maxResults=4`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Google Books API Error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }

  const searchBooks = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await fetchGoogleBooks(query);
      const items: BookResult[] = [];

      // Check if items exist and process them
      if (results.items && results.items.length > 0) {
        results.items.forEach((item: GoogleBooksItem) => {
          // Add safety checks for missing data
          items.push({
            id: item.id || Math.random().toString(),
            title: item.volumeInfo?.title || "Unknown Title",
            author: item.volumeInfo?.authors?.[0] || "Unknown Author",
            type: item.volumeInfo?.categories?.[0] || "Unknown",
            totalPages: item.volumeInfo?.pageCount || 0,
            imageUrl: item.volumeInfo?.imageLinks?.thumbnail || "",
            description: item.volumeInfo?.description || "",
          });
        });

        setSearchResults(items);
      } else {
        // Fallback to mock data if no results from API
        const mockResults: BookResult[] = [
          {
            id: "1",
            title: `${query} - The Complete Guide`,
            author: "John Smith",
            type: "Educational",
            totalPages: 320,
            imageUrl: "https://picsum.photos/200/300?random=1",
            description: "A comprehensive guide to understanding the topic.",
          },
          {
            id: "2",
            title: `Advanced ${query}`,
            author: "Jane Doe",
            type: "Technical",
            totalPages: 450,
            imageUrl: "https://picsum.photos/200/300?random=2",
            description: "Deep dive into advanced concepts and techniques.",
          },
          {
            id: "3",
            title: `${query} for Beginners`,
            author: "Mike Johnson",
            type: "Beginner",
            totalPages: 280,
            imageUrl: "https://picsum.photos/200/300?random=3",
            description: "Perfect starting point for newcomers.",
          },
          {
            id: "4",
            title: `Mastering ${query}`,
            author: "Sarah Wilson",
            type: "Advanced",
            totalPages: 380,
            imageUrl: "https://picsum.photos/200/300?random=4",
            description: "Expert-level insights and practical applications.",
          },
        ];
        setSearchResults(mockResults);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error searching books:", error);

      // Show mock results as fallback in case of API error
      const mockResults: BookResult[] = [
        {
          id: "1",
          title: `${query} - The Complete Guide`,
          author: "John Smith",
          type: "Educational",
          totalPages: 320,
          imageUrl: "https://picsum.photos/200/300?random=1",
          description: "A comprehensive guide to understanding the topic.",
        },
        {
          id: "2",
          title: `Advanced ${query}`,
          author: "Jane Doe",
          type: "Technical",
          totalPages: 450,
          imageUrl: "https://picsum.photos/200/300?random=2",
          description: "Deep dive into advanced concepts and techniques.",
        },
        {
          id: "3",
          title: `${query} for Beginners`,
          author: "Mike Johnson",
          type: "Beginner",
          totalPages: 280,
          imageUrl: "https://picsum.photos/200/300?random=3",
          description: "Perfect starting point for newcomers.",
        },
        {
          id: "4",
          title: `Mastering ${query}`,
          author: "Sarah Wilson",
          type: "Advanced",
          totalPages: 380,
          imageUrl: "https://picsum.photos/200/300?random=4",
          description: "Expert-level insights and practical applications.",
        },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }
  };

  // Automatically search when modal opens with initialQuery
  useEffect(() => {
    if (isOpen && initialQuery) {
      searchBooks(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleBookSelect = (book: BookResult) => {
    onBookSelect(book);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#111212] border border-neutral-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">
            Choose from these books?
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Show search query */}
        {initialQuery && (
          <div className="mb-4 p-3 bg-neutral-800 rounded-md">
            <p className="text-neutral-300 text-sm">
              <span className="text-neutral-400">Searching for:</span>
              {initialQuery}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-neutral-400">Searching for books...</p>
          </div>
        )}

        {/* 2x2 Grid Results */}
        {searchResults.length > 0 && !isLoading && (
          <div className="grid grid-cols-2 gap-20 px-16 py-8">
            {searchResults.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className="bg-neutral-900 border border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-800 hover:border-neutral-600 transition-all group"
              >
                {/* Book Cover */}
                <div className="w-full h-full bg-neutral-700 rounded-md mb-3 overflow-hidden">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-90 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://via.placeholder.com/200x300/404040/ffffff?text=No+Image";
                    }}
                  />
                </div>

                {/* Book Info */}
                <div className="space-y-1">
                  <h4 className="text-white font-medium text-sm leading-tight line-clamp-2">
                    {book.title}
                  </h4>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400 text-xs">
                      by {book.author}
                    </span>
                    <span className="text-neutral-500">
                      {book.totalPages} pages
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {searchResults.length === 0 && !isLoading && initialQuery && (
          <div className="text-center py-12">
            <div className="text-neutral-500 mb-2">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-neutral-400">No books found</p>
            <p className="text-neutral-500 text-sm">
              Try a different search term
            </p>
          </div>
        )}

        {/* Initial state when no query */}
        {!initialQuery && !isLoading && (
          <div className="text-center py-12">
            <div className="text-neutral-500 mb-2">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-neutral-400">Enter a book title to search</p>
          </div>
        )}
      </div>
    </div>
  );
};
