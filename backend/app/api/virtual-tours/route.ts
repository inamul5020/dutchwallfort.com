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

// GET /api/virtual-tours - List all virtual tours
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');
    const tourType = searchParams.get('tourType');
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    const limit = searchParams.get('limit');

    const where: any = {};
    
    if (roomId) {
      where.roomId = parseInt(roomId);
    }
    
    if (tourType) {
      where.tourType = tourType;
    }
    
    if (featured === 'true') {
      where.isFeatured = true;
    }
    
    if (active !== 'false') {
      where.isActive = true;
    }

    const tours = await prisma.virtualTour.findMany({
      where,
      include: {
        room: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    });

    // Map database fields to frontend expected fields
    const mappedTours = tours.map(tour => ({
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
    }));

    return NextResponse.json(
      { 
        success: true, 
        data: mappedTours, 
        count: mappedTours.length 
      },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching virtual tours:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch virtual tours' },
      { status: 500, headers }
    );
  }
}

// POST /api/virtual-tours - Create new virtual tour
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const tour = await prisma.virtualTour.create({
      data: {
        title: body.title,
        description: body.description,
        roomId: body.room_id || null,
        tourType: body.tour_type || '360',
        thumbnailUrl: body.thumbnail_url,
        tourData: body.tour_data || null,
        isActive: body.is_active !== false,
        isFeatured: body.is_featured || false,
        sortOrder: body.sort_order || 0,
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
      { status: 201, headers }
    );
  } catch (error) {
    console.error('Error creating virtual tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create virtual tour' },
      { status: 500, headers }
    );
  }
}
