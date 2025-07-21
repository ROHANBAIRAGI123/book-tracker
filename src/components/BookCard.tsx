import React, { useState } from "react";
import { AddPages } from "./AddPages";
import { useBookStoreList, useDeleteBook } from "@/store/useBookStore";
import { getValueFromStorage } from "@/helpers/localStorageApi";
import { HiDotsVertical } from "react-icons/hi";

export const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  currentPage,
  totalPages,
  status,
  type,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAddPages, setShowAddPages] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setBookList } = useBookStoreList();
  const { deleteBook } = useDeleteBook();
  const progress = (currentPage / totalPages) * 100;

  const handleDataUpdate = () => {
    setBookList(getValueFromStorage());
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card-level events from firing
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBook(title);
    }
    setIsMenuOpen(false);
    setBookList(getValueFromStorage());
  };

  return (
    // Main container with responsive padding and max-width for bigger screens
    <div className="flex bg-[#111212] border border-neutral-700 rounded-lg shadow-lg w-full max-w-3xl min-w-0 mx-auto ">
      {/* Left side: Placeholder for book cover image or graphic */}
      <div className="w-32 h-auto bg-neutral-800 rounded-md shrink-0 mr-4"></div>

      {/* Right side: Book details */}
      <div className="relative flex-1 flex flex-col justify-between pt-4 lg:pt-8 pr-4 lg:pr-8 ">
        <div className="absolute top-5 right-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-2 rounded-full hover:bg-neutral-700 text-neutral-400"
            aria-label="More options"
          >
            <HiDotsVertical size={20} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1E1F20] border border-neutral-700 rounded-md shadow-lg z-20">
              <ul className="py-1">
                <li>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddPages(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700"
                  >
                    Add Pages
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-700"
                  >
                    Delete Book
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          {/* Progress Bar */}
          <div className="w-full h-3 bg-[#1E1F20] rounded-full mb-2 ">
            <div
              className="h-full bg-[#C1BC2E] rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <h3 className="text-white text-2xl font-semibold mb-1 font-outfit">
            {title}
          </h3>
          <p className="text-neutral-400 text-md mb-2 truncate font-inter">
            {author}
          </p>
          <p
            className="text-neutral-500 text-s font-inter "
            onMouseOver={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowAddPages(true);
            }}
          >
            {isHovered
              ? `completed ${progress.toFixed(2)}%`
              : ` Page ${currentPage} of ${totalPages}`}
          </p>
        </div>

        <div className="flex justify-between items-end mt-2 text-neutral-500 text-xs sm:pb-6 lg:pb-8 font-inter">
          <p className="capitalize">{status}</p>
          <p>{type}</p>
        </div>
      </div>
      {showAddPages && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-none flex items-center justify-center z-10">
          <AddPages
            onClose={() => setShowAddPages(false)}
            title={title}
            onUpdate={handleDataUpdate}
          />
        </div>
      )}
    </div>
  );
};
