import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminHandler, adminWriteHandler } from "../../../../../lib/api-middleware";

const prisma = new PrismaClient();

async function getAdminRoomHandler(request: NextRequest, user: any): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = parseInt(pathParts[pathParts.length - 1]);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid room ID' },
        { status: 400 }
      );
    }

    const room = await prisma.room.findUnique({
      where: { id }
    });

    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error fetching admin room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch room' },
      { status: 500 }
    );
  }
}

async function updateAdminRoomHandler(request: NextRequest, user: any): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = parseInt(pathParts[pathParts.length - 1]);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid room ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Handle partial updates - only update provided fields
    const updateData: any = {};
    
    if (body.slug !== undefined) {
      updateData.slug = body.slug;
    }
    if (body.name !== undefined) {
      updateData.name = body.name;
    }
    if (body.shortDescription !== undefined) {
      updateData.shortDescription = body.shortDescription;
    }
    if (body.longDescription !== undefined) {
      updateData.longDescription = body.longDescription;
    }
    if (body.capacity !== undefined) {
      updateData.capacity = body.capacity;
    }
    if (body.beds !== undefined) {
      updateData.beds = body.beds;
    }
    if (body.amenities !== undefined) {
      updateData.amenities = body.amenities;
    }
    if (body.price !== undefined) {
      updateData.price = body.price;
    }
    if (body.images !== undefined) {
      updateData.images = body.images;
    }
    if (body.isActive !== undefined) {
      updateData.isActive = body.isActive;
    }

    const room = await prisma.room.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error updating admin room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update room' },
      { status: 500 }
    );
  }
}

async function deleteAdminRoomHandler(request: NextRequest, user: any): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = parseInt(pathParts[pathParts.length - 1]);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid room ID' },
        { status: 400 }
      );
    }

    await prisma.room.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting admin room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete room' },
      { status: 500 }
    );
  }
}

// Export admin handlers
export const GET = adminHandler(getAdminRoomHandler);
export const PUT = adminHandler(updateAdminRoomHandler); // Remove validation for partial updates
export const DELETE = adminHandler(deleteAdminRoomHandler); // Remove validation for delete

// Add explicit OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
