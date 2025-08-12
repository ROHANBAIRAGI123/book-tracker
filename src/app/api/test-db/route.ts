import { NextResponse } from "next/server";
import { testDatabaseConnection, prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const isConnected = await testDatabaseConnection();

    if (!isConnected) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Test basic operations
    const bookCount = await prisma.book.count();

    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
      bookCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database test failed:", error);
    return NextResponse.json(
      { error: "Database test failed", details: error },
      { status: 500 }
    );
  }
}
