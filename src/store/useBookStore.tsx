import { create } from "zustand";

type BookStoreForm = {
  showAddBookForm: boolean;
  setShowAddBookForm: (show: boolean) => void;
};

type BookStoreList = {
  bookList: Book[];
  setBookList: (books: Book[]) => void;
};

type BookStoreFormData = {
  formData: NewBookData;
  setFormData: (data: NewBookData) => void;
};

const useBookStoreForm = create<BookStoreForm>()((set) => ({
  showAddBookForm: false,
  setShowAddBookForm: (show: boolean) => set(() => ({ showAddBookForm: show })),
}));

const useBookStoreList = create<BookStoreList>()((set) => ({
  bookList: [],
  setBookList: (books: Book[]) => set(() => ({ bookList: books })),
}));

const useBookStoreFormData = create<BookStoreFormData>()((set) => ({
  formData: {
    title: "",
    author: "",
    currentPage: "0",
    totalPages: "0",
    status: "to be read",
    type: "",
  },
  setFormData: (data: NewBookData) => {
    set(() => ({ formData: data }));
  },
}));

export { useBookStoreForm, useBookStoreList, useBookStoreFormData };
