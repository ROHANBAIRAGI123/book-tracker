import React, { useState } from "react";

export const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  currentPage,
  totalPages,
  status,
  type,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const progress = (currentPage / totalPages) * 100;

  return (
    // Main container with responsive padding and max-width for bigger screens
    <div className="flex bg-[#111212] border border-neutral-700 rounded-lg shadow-lg w-full max-w-3xl min-w-0 mx-auto ">
      {/* Left side: Placeholder for book cover image or graphic */}
      <div className="w-32 h-auto bg-neutral-800 rounded-md shrink-0 mr-4"></div>

      {/* Right side: Book details */}
      <div className="flex-1 flex flex-col justify-between pt-4 lg:pt-8 pr-4 lg:pr-8 ">
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
    </div>
  );
};
