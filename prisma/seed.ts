import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Clear existing data (in correct order due to foreign key constraints)
    console.log("🧹 Cleaning existing data...");
    await prisma.progress.deleteMany();
    await prisma.book.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.user.deleteMany();

    // 1. Create users
    console.log("👤 Creating users...");
    const user1 = await prisma.user.create({
      data: {
        id: "user1",
        email: "alice@example.com",
        subscriptionStatus: "premium",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        id: "user2",
        email: "bob@example.com",
        subscriptionStatus: "free",
      },
    });

    // 2. Create genres
    console.log("📚 Creating genres...");
    const genres = [
      { id: "genre1", name: "Science Fiction" },
      { id: "genre2", name: "Philosophy" },
      { id: "genre3", name: "Self Help" },
      { id: "genre4", name: "Fantasy" },
      { id: "genre5", name: "Romance" },
      { id: "genre6", name: "Productivity" },
      { id: "genre7", name: "Biography" },
      { id: "genre8", name: "Mystery" },
      { id: "genre9", name: "History" },
      { id: "genre10", name: "Technology" },
    ];

    for (const genre of genres) {
      await prisma.genre.create({
        data: genre,
      });
    }

    // 3. Create books for user1
    console.log("📖 Creating books for Alice...");
    const book1 = await prisma.book.create({
      data: {
        id: "book1",
        title: "Atomic Habits",
        author: "James Clear",
        totalPages: 320,
        currentPage: 120,
        status: "READING",
        cover: "https://covers.openlibrary.org/b/id/8165266-L.jpg",
        notes:
          "Great insights on habit formation. The 1% better concept is powerful.",
        userId: user1.id,
        genreId: "genre3", // Self Help
      },
    });

    const book2 = await prisma.book.create({
      data: {
        id: "book2",
        title: "The Alchemist",
        author: "Paulo Coelho",
        totalPages: 208,
        currentPage: 208,
        status: "COMPLETED",
        dateCompleted: new Date("2025-07-10"),
        cover: "https://covers.openlibrary.org/b/id/8221420-L.jpg",
        notes:
          "Beautiful story about following your dreams. The universe conspires to help you.",
        userId: user1.id,
        genreId: "genre2", // Philosophy
      },
    });

    const book3 = await prisma.book.create({
      data: {
        id: "book3",
        title: "Dune",
        author: "Frank Herbert",
        totalPages: 600,
        currentPage: 85,
        status: "READING",
        cover: "https://covers.openlibrary.org/b/id/8128691-L.jpg",
        notes:
          "Complex world-building. Paul Atreides character development is fascinating.",
        userId: user1.id,
        genreId: "genre1", // Science Fiction
      },
    });

    // 4. Create books for user2
    console.log("📖 Creating books for Bob...");
    const book4 = await prisma.book.create({
      data: {
        id: "book4",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        totalPages: 310,
        currentPage: 150,
        status: "ON_HOLD",
        cover: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        notes: "Classic fantasy adventure. Bilbo's journey is captivating.",
        userId: user2.id,
        genreId: "genre4", // Fantasy
      },
    });

    const book5 = await prisma.book.create({
      data: {
        id: "book5",
        title: "Steve Jobs",
        author: "Walter Isaacson",
        totalPages: 656,
        currentPage: 656,
        status: "COMPLETED",
        dateCompleted: new Date("2025-06-20"),
        cover: "https://covers.openlibrary.org/b/id/7572283-L.jpg",
        notes:
          "Incredible biography. Shows the complexity of innovation and leadership.",
        userId: user2.id,
        genreId: "genre7", // Biography
      },
    });

    const book6 = await prisma.book.create({
      data: {
        id: "book6",
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        totalPages: 381,
        currentPage: 45,
        status: "DROPPED",
        cover: "https://covers.openlibrary.org/b/id/295577-L.jpg",
        notes: "Started but couldn't get into it. Maybe will try again later.",
        userId: user2.id,
        genreId: "genre6", // Productivity
      },
    });

    // 5. Create progress logs
    console.log("📈 Creating progress logs...");

    // Progress for Atomic Habits
    await prisma.progress.createMany({
      data: [
        { bookId: book1.id, pagesRead: 50, createdAt: new Date("2025-07-01") },
        { bookId: book1.id, pagesRead: 30, createdAt: new Date("2025-07-03") },
        { bookId: book1.id, pagesRead: 40, createdAt: new Date("2025-07-05") },
      ],
    });

    // Progress for The Alchemist (completed)
    await prisma.progress.createMany({
      data: [
        { bookId: book2.id, pagesRead: 80, createdAt: new Date("2025-06-15") },
        { bookId: book2.id, pagesRead: 60, createdAt: new Date("2025-06-20") },
        { bookId: book2.id, pagesRead: 68, createdAt: new Date("2025-07-10") },
      ],
    });

    // Progress for Dune
    await prisma.progress.createMany({
      data: [
        { bookId: book3.id, pagesRead: 45, createdAt: new Date("2025-07-25") },
        { bookId: book3.id, pagesRead: 40, createdAt: new Date("2025-07-28") },
      ],
    });

    // Progress for The Hobbit
    await prisma.progress.createMany({
      data: [
        { bookId: book4.id, pagesRead: 75, createdAt: new Date("2025-06-01") },
        { bookId: book4.id, pagesRead: 75, createdAt: new Date("2025-06-10") },
      ],
    });

    // Progress for Steve Jobs (completed)
    await prisma.progress.createMany({
      data: [
        { bookId: book5.id, pagesRead: 150, createdAt: new Date("2025-05-15") },
        { bookId: book5.id, pagesRead: 200, createdAt: new Date("2025-05-25") },
        { bookId: book5.id, pagesRead: 306, createdAt: new Date("2025-06-20") },
      ],
    });

    // Progress for 7 Habits (dropped)
    await prisma.progress.createMany({
      data: [
        { bookId: book6.id, pagesRead: 25, createdAt: new Date("2025-04-01") },
        { bookId: book6.id, pagesRead: 20, createdAt: new Date("2025-04-05") },
      ],
    });

    console.log("🌱 Seeding completed successfully!");

    // Verify the data
    const userCount = await prisma.user.count();
    const bookCount = await prisma.book.count();
    const genreCount = await prisma.genre.count();
    const progressCount = await prisma.progress.count();

    console.log(`📊 Created:`);
    console.log(`   👤 ${userCount} users`);
    console.log(`   📚 ${genreCount} genres`);
    console.log(`   📖 ${bookCount} books`);
    console.log(`   📈 ${progressCount} progress entries`);

    // Show some sample data
    console.log("\n📋 Sample data:");
    const booksWithGenres = await prisma.book.findMany({
      include: {
        genre: true,
        user: { select: { email: true } },
        progressLogs: true,
      },
      take: 3,
    });

    booksWithGenres.forEach((book) => {
      console.log(`   📖 "${book.title}" by ${book.author}`);
      console.log(`      Genre: ${book.genre.name}`);
      console.log(`      Owner: ${book.user.email}`);
      console.log(`      Status: ${book.status}`);
      console.log(
        `      Progress: ${book.currentPage}/${book.totalPages} pages`
      );
      console.log(`      Progress logs: ${book.progressLogs.length} entries`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .then(() => console.log("🎉 Seeding process finished"))
  .catch((e) => {
    console.error("💥 Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed");
  });
