import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminHandler } from "../../../../lib/api-middleware";

const prisma = new PrismaClient();

async function getAdminRoomsHandler(request: NextRequest, user: any): Promise<NextResponse> {
  try {
    // Return all rooms for admin (including inactive ones)
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      success: true,
      data: rooms,
      count: rooms.length
    });
  } catch (error) {
    console.error('Error fetching admin rooms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin rooms' },
      { status: 500 }
    );
  }
}

// Export admin handler
export const GET = adminHandler(getAdminRoomsHandler);

// Add explicit OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
