import { deleteBookFromStorage } from "@/lib/localStorageApi";
import { Book, NewBookData } from "@/types";
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

type DeleteBookProp = {
  deleteBook: (title: string) => void;
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
    status: "READING",
    type: "",
  },
  setFormData: (data: NewBookData) => {
    set(() => ({ formData: data }));
  },
}));

const useDeleteBook = create<DeleteBookProp>()(() => ({
  deleteBook: (title: string) => {
    deleteBookFromStorage(title);
  },
}));

export {
  useBookStoreForm,
  useBookStoreList,
  useBookStoreFormData,
  useDeleteBook,
};
