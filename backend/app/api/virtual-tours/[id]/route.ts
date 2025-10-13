import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers });
}

// GET /api/virtual-tours/[id] - Get virtual tour by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tour ID' },
        { status: 400, headers }
      );
    }

    const tour = await prisma.virtualTour.findUnique({
      where: { id },
      include: {
        room: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    if (!tour) {
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404, headers }
      );
    }

    // Map database fields to frontend expected fields
    const mappedTour = {
      id: tour.id,
      title: tour.title,
      description: tour.description,
      room_id: tour.roomId,
      room: tour.room ? {
        id: tour.room.id,
        name: tour.room.name,
        slug: tour.room.slug
      } : null,
      tour_type: tour.tourType,
      thumbnail_url: tour.thumbnailUrl,
      tour_data: tour.tourData,
      is_active: tour.isActive,
      is_featured: tour.isFeatured,
      sort_order: tour.sortOrder,
      created_at: tour.createdAt.toISOString(),
      updated_at: tour.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedTour },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching virtual tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch virtual tour' },
      { status: 500, headers }
    );
  }
}

// PUT /api/virtual-tours/[id] - Update virtual tour
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tour ID' },
        { status: 400, headers }
      );
    }

    const body = await request.json();

    const tour = await prisma.virtualTour.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        roomId: body.room_id,
        tourType: body.tour_type,
        thumbnailUrl: body.thumbnail_url,
        tourData: body.tour_data,
        isActive: body.is_active,
        isFeatured: body.is_featured,
        sortOrder: body.sort_order,
      },
      include: {
        room: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    // Map database fields to frontend expected fields
    const mappedTour = {
      id: tour.id,
      title: tour.title,
      description: tour.description,
      room_id: tour.roomId,
      room: tour.room ? {
        id: tour.room.id,
        name: tour.room.name,
        slug: tour.room.slug
      } : null,
      tour_type: tour.tourType,
      thumbnail_url: tour.thumbnailUrl,
      tour_data: tour.tourData,
      is_active: tour.isActive,
      is_featured: tour.isFeatured,
      sort_order: tour.sortOrder,
      created_at: tour.createdAt.toISOString(),
      updated_at: tour.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedTour },
      { headers }
    );
  } catch (error) {
    console.error('Error updating virtual tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update virtual tour' },
      { status: 500, headers }
    );
  }
}

// DELETE /api/virtual-tours/[id] - Delete virtual tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tour ID' },
        { status: 400, headers }
      );
    }

    await prisma.virtualTour.delete({
      where: { id }
    });

    return NextResponse.json(
      { success: true, message: 'Tour deleted successfully' },
      { headers }
    );
  } catch (error) {
    console.error('Error deleting virtual tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete virtual tour' },
      { status: 500, headers }
    );
  }
}
