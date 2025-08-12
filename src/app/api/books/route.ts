import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { BookStatus } from "@/generated/prisma";

// Validation schema
const CreateBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  totalPages: z.number().positive().default(0),
  currentPage: z.number().default(0),
  status: z
    .enum(["ON_HOLD", "DROPPED", "READING", "COMPLETED"])
    .default("READING"),
  notes: z.string().optional(),
  cover: z.string().min(1, "Cover is required").default(""),
  genreId: z.string().min(1, "Genre ID is required").default("genre1"),
  genres: z.array(z.string()).optional(),
  dateAdded: z.date().optional().default(new Date()),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // For now, we'll use a hardcoded userId - replace with actual auth later
    const userId = "user1";

    const where = {
      userId,
      ...(status && { status: status as BookStatus }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { author: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [books, totalCount] = await Promise.all([
      prisma.book.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { dateAdded: "desc" },
      }),
      prisma.book.count({ where }),
    ]);

    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

// POST /api/books - Create new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateBookSchema.parse(body);

    // For now, we'll use a hardcoded userId - replace with actual auth later
    const userId = "user1";

    const book = await prisma.book.create({
      data: {
        ...validatedData,
        userId,
      },
    });
    console.log("book from server", book);

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.log("error occured", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
