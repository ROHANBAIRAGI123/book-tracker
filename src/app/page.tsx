"use client";
import { useEffect, useState } from "react";
import { ReadingList } from "../components/ReadingList";
import Head from "next/head";
import { useBookStoreList } from "@/store/useBookStore";

export default function Home() {
  const { bookList, setBookList } = useBookStoreList();
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
