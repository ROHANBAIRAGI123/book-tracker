import React from "react";
import { BookCard } from "./BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  status: string;
  type: string;
}

interface ReadingListProps {
  books: Book[];
  title: string;
}

export const ReadingList: React.FC<ReadingListProps> = ({ books, title }) => {
  const booksReadCount = books.filter(
    (book) => book.status === "completed"
  ).length;
  const totalBooksCount = books.length;
  const progressSummary = `${booksReadCount} of ${totalBooksCount} books read`;

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      {/* List Header */}
      <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
          <p className="text-neutral-500 text-sm mt-1">{progressSummary}</p>
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full text-lg">
          +
        </button>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 rounded-md px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
        <button className="text-neutral-400 hover:text-white px-2">
          {/* A simple placeholder for a sort icon */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Book Cards Grid/List */}
      <div className="grid gap-4 sm:grid-cols-1">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} {...book} />)
        ) : (
          <p className="text-neutral-500 text-center col-span-full">
            No books found. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
};
