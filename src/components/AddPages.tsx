import { updateBookValue } from "@/helpers/localStorageApi";
import React from "react";

// Defines the data structure for a new book

export const AddPages: React.FC<AddPagesProps> = ({
  title = "",
  onClose,
  onUpdate,
}) => {
  const [newPages, setNewPages] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewPages(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPage = parseInt(newPages, 10);
    if (isNaN(currentPage)) {
      alert("Please enter a valid number for adding page");
      return;
    }
    updateBookValue(title, currentPage);
    onUpdate();
    onClose();
  };

  return (
    <div className="bg-[#111212] border border-neutral-700 shadow-xl rounded-lg p-6 w-full max-w-md mx-4 md:mx-auto relative z-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-400">
              Current Page
            </label>
            <input
              type="number"
              name="currentPage"
              value={newPages}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
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
            Add Pages
          </button>
        </div>
      </form>
    </div>
  );
};
