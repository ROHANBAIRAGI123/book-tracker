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

interface BookCardProps {
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  status: string;
  type: string;
}

interface NewBookData {
  title: string;
  author: string;
  currentPage: string;
  totalPages: string;
  status: "in progress" | "completed" | "to be read";
  type: string;
}

interface AddBookFormProps {
  onClose: () => void;
  onSubmit: (
    book: Omit<NewBookData, "currentPage" | "totalPages"> & {
      currentPage: number;
      totalPages: number;
    }
  ) => void;
}
