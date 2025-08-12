"use client";
import { useEffect, useState } from "react";
import { ReadingList } from "../components/ReadingList";
import Head from "next/head";
import { useBookStoreList } from "@/store/useBookStore";
import { getValueFromStorage } from "@/lib/localStorageApi";

export default function Home() {
  const { bookList, setBookList } = useBookStoreList();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("/api/books", {
          method: "GET",
        });
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBookList(data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoaded(true);
      }
    }
    loadBooks();
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
