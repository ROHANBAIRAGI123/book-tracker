export interface Book {
  id: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  status: string;
  type: string;
}

export interface ReadingListProps {
  books: Book[];
  title: string;
}

export interface BookCardProps {
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  status: string;
  type: string;
}

export interface NewBookData {
  title: string;
  author: string;
  currentPage: string;
  totalPages: string;
  status: "READING" | "ON_HOLD" | "DROPPED" | "COMPLETED";
  type: string;
}

export interface AddBookFormProps {
  onClose: () => void;
  onSubmit: (
    book: Omit<NewBookData, "currentPage" | "totalPages"> & {
      currentPage: number;
      totalPages: number;
    }
  ) => void;
}

export interface AddPagesProps {
  onClose: () => void;
  onUpdate: () => void;
  title: string;
}
