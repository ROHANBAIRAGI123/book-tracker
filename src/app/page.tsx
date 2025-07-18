import { ReadingList } from "../components/ReadingList";
import Head from "next/head";

const DUMMY_BOOKS = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    currentPage: 150,
    totalPages: 180,
    status: "in progress",
    type: "Fiction",
  },
  {
    id: "2",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    currentPage: 443,
    totalPages: 443,
    status: "completed",
    type: "Non-Fiction",
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    currentPage: 25,
    totalPages: 896,
    status: "to be read",
    type: "Sci-Fi",
  },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Book Tracker App</title>
      </Head>
      <main className="bg-black text-white min-h-screen">
        <ReadingList books={DUMMY_BOOKS} title="Currently Reading" />
      </main>
    </div>
  );
}
