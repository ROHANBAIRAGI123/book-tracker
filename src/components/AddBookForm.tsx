import React, { useState } from "react";
import { useBookStoreFormData } from "@/store/useBookStore";
import { AddBookFormProps } from "@/types";
import { BookSearchModal } from "./BookSearchModal";

// Book result interface
interface BookResult {
  id: string;
  title: string;
  author: string;
  // type: string;
  totalPages: number;
  imageUrl: string;
  description?: string;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const { formData, setFormData } = useBookStoreFormData();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentPage = parseInt(formData.currentPage, 10);
    const totalPages = parseInt(formData.totalPages, 10);
    if (isNaN(currentPage) || isNaN(totalPages)) {
      alert("Please enter valid numbers for current page and total pages");
      return;
    }
    if (currentPage > totalPages) {
      alert("Current page cannot be greater than total pages");
      return;
    }
    // Convert string inputs to numbers
    const newBook = {
      ...formData,
      currentPage,
      totalPages,
    };

    onSubmit(newBook);
    onClose();
  };

  // Handle search icon click
  const handleSearchClick = () => {
    if (formData.title.trim()) {
      setShowSearchModal(true);
    } else {
      alert("Please enter a book title first");
    }
  };

  // Handle book selection from search results
  const handleBookSelect = (book: BookResult) => {
    setFormData({
      ...formData,
      title: book.title,
      author: book.author,
      // type: book.type,
      totalPages: book.totalPages.toString(),
      currentPage: "0",
    });
  };

  return (
    <>
      <div className="bg-[#111212] border border-neutral-700 shadow-xl rounded-lg p-6 w-full max-w-md mx-4 md:mx-auto relative z-10">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title with Search */}
          <div>
            <label className="block text-sm font-medium text-neutral-400">
              Title
            </label>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                required
              />
              <button
                type="button"
                onClick={handleSearchClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-yellow-500 focus:outline-none p-1 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-neutral-400">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-400">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              <option value="READING">READING</option>
              <option value="DROPPED">DROPPED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="ON_HOLD">ON_HOLD</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-400">
              Type
            </label>
            <input
              type="text"
              name="type"
              // value={formData.type}
              // onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          {/* Pages */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-400">
                Current Page
              </label>
              <input
                type="number"
                name="currentPage"
                value={formData.currentPage}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                min="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-400">
                Total Pages
              </label>
              <input
                type="number"
                name="totalPages"
                value={formData.totalPages}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                min="1"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-400 hover:text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>

      {/* Search Modal */}
      <BookSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onBookSelect={handleBookSelect}
        initialQuery={formData.title}
      />
    </>
  );
};
