"use client";
import { useEffect, useState } from "react";
import { ReadingList } from "../components/ReadingList";
import Head from "next/head";

// const DUMMY_BOOKS = [
//   {
//     id: "1",
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     currentPage: 150,
//     totalPages: 180,
//     status: "in progress",
//     type: "Fiction",
//   },
//   {
//     id: "2",
//     title: "Sapiens: A Brief History of Humankind",
//     author: "Yuval Noah Harari",
//     currentPage: 443,
//     totalPages: 443,
//     status: "completed",
//     type: "Non-Fiction",
//   },
//   {
//     id: "3",
//     title: "Dune",
//     author: "Frank Herbert",
//     currentPage: 25,
//     totalPages: 896,
//     status: "to be read",
//     type: "Sci-Fi",
//   },
// ];

export default function Home() {
  const [bookList, setBookList] = useState<Book[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("books");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBookList(parsed);
      } catch (e) {
        console.error("Failed to parse books from localStorage", e);
      }
    }
    setLoaded(true);
  }, []);
  if (!loaded) return <div>Loading...</div>;
  return (
    <div>
      <Head>
        <title>Book Tracker App</title>
      </Head>
      <main className="bg-black text-white min-h-screen">
        <ReadingList books={bookList || []} title="All Books" />
      </main>
    </div>
  );
}
