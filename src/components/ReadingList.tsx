"use client";
import React, { useState } from "react";
import { BookCard } from "./BookCard";
import { AddBookForm } from "./AddBookForm";
import { v4 as uuidv4 } from "uuid";

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
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [bookList, setBookList] = useState<Book[]>(books);

  const booksReadCount = bookList.filter(
    (book) => book.status === "completed"
  ).length;
  const totalBooksCount = bookList.length;
  const progressSummary = `${booksReadCount} of ${totalBooksCount} books read`;

  const handleAddBook = (newBookData: Omit<Book, "id">) => {
    const newBook = { id: uuidv4(), ...newBookData };
    setBookList([...bookList, newBook]);
    localStorage.setItem("books", JSON.stringify([...bookList, newBook]));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 w-full">
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          showAddBookForm ? "opacity-20 blur-sm" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4 font-outfit">
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {title}
            </h1>
            <p className="text-neutral-500 text-sm mt-1">{progressSummary}</p>
          </div>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full text-lg"
            onClick={() => setShowAddBookForm(true)}
          >
            +
          </button>
        </div>
        {/* Search & Sort Controls */}
        <div className="flex justify-between items-center mb-6 font-inter">
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
        <div className="grid gap-4">
          {bookList.length > 0 ? (
            bookList.map((book) => <BookCard key={book.id} {...book} />)
          ) : (
            <p className="text-neutral-500 text-center col-span-full">
              No books found. Add one to get started!
            </p>
          )}
        </div>
      </div>

      {/* Modal Backdrop and Form */}
      {showAddBookForm && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-none flex items-center justify-center z-10">
          <AddBookForm
            onClose={() => setShowAddBookForm(false)}
            onSubmit={handleAddBook}
          />
        </div>
      )}
    </div>
  );
};
