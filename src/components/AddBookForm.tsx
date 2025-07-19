import React, { useState } from "react";

// Defines the data structure for a new book

export const AddBookForm: React.FC<AddBookFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<NewBookData>({
    title: "",
    author: "",
    currentPage: "0",
    totalPages: "0",
    status: "to be read",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert string inputs to numbers
    const newBook = {
      ...formData,
      currentPage: parseInt(formData.currentPage, 10),
      totalPages: parseInt(formData.totalPages, 10),
    };

    onSubmit(newBook);
    onClose();
  };

  return (
    <div className="bg-[#111212] border border-neutral-700 shadow-xl rounded-lg p-6 w-full max-w-md mx-4 md:mx-auto relative z-10">
      <h2 className="text-xl font-semibold mb-4 text-white">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-neutral-400">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />
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
            <option value="to be read">To Be Read</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
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
            value={formData.type}
            onChange={handleChange}
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
            className="px-4 py-2 text-neutral-400 hover:text-white rounded-md"
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
  );
};
