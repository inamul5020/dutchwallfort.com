import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminHandler, adminWriteHandler } from "../../../../lib/api-middleware";

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

async function createAdminRoomHandler(request: NextRequest, user: any): Promise<NextResponse> {
  try {
    const body = await request.json();

    const room = await prisma.room.create({
      data: {
        slug: body.slug,
        name: body.name,
        shortDescription: body.shortDescription,
        longDescription: body.longDescription,
        capacity: body.capacity,
        beds: body.beds,
        amenities: body.amenities || [],
        price: body.price,
        images: body.images || [],
        isActive: body.isActive !== undefined ? body.isActive : true,
      }
    });

    return NextResponse.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error creating admin room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create room' },
      { status: 500 }
    );
  }
}

// Export admin handlers
export const GET = adminHandler(getAdminRoomsHandler);
export const POST = adminWriteHandler(createAdminRoomHandler, 'room');

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
