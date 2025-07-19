export const getValueFromStorage = () => {
  const stored = localStorage.getItem("books");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed;
    } catch (e) {
      console.error("Failed to parse books from localStorage", e);
    }
  }
  return [];
};

export const addValueToStorage = (book: Book) => {
  const storedBooks = getValueFromStorage();
  const books = [...storedBooks, book];
  localStorage.setItem("books", JSON.stringify(books));
};

export const updateBookValue = (title: string, updatedPages: number) => {
  const storedBooks = getValueFromStorage();
  const updatedBooks = storedBooks.map((book: Book) => {
    if (book.title === title) {
      return {
        ...book,
        currentPage: book.currentPage + updatedPages,
      };
    }
    return book;
  });
  localStorage.setItem("books", JSON.stringify(updatedBooks));
};

export const deleteBookFromStorage = (title: string) => {
  const storedBooks = getValueFromStorage();
  const updatedBooks = storedBooks.filter((book: Book) => book.title !== title);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
};
