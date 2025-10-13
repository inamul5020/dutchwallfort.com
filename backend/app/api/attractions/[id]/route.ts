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

// GET /api/attractions/[id] - Get attraction by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid attraction ID' },
        { status: 400, headers }
      );
    }

    const attraction = await prisma.attraction.findUnique({
      where: { id }
    });

    if (!attraction) {
      return NextResponse.json(
        { success: false, error: 'Attraction not found' },
        { status: 404, headers }
      );
    }

    // Map database fields to frontend expected fields
    const mappedAttraction = {
      id: attraction.id,
      name: attraction.name,
      slug: attraction.slug,
      description: attraction.description,
      long_description: attraction.longDescription,
      category: attraction.category,
      address: attraction.address,
      latitude: attraction.latitude,
      longitude: attraction.longitude,
      phone: attraction.phone,
      website: attraction.website,
      email: attraction.email,
      opening_hours: attraction.openingHours,
      price_range: attraction.priceRange,
      rating: attraction.rating,
      image_url: attraction.imageUrl,
      gallery: attraction.gallery,
      features: attraction.features,
      distance: attraction.distance,
      is_active: attraction.isActive,
      is_featured: attraction.isFeatured,
      sort_order: attraction.sortOrder,
      created_at: attraction.createdAt.toISOString(),
      updated_at: attraction.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedAttraction },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching attraction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attraction' },
      { status: 500, headers }
    );
  }
}

// PUT /api/attractions/[id] - Update attraction
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid attraction ID' },
        { status: 400, headers }
      );
    }

    const body = await request.json();

    const attraction = await prisma.attraction.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        longDescription: body.long_description,
        category: body.category,
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
        phone: body.phone,
        website: body.website,
        email: body.email,
        openingHours: body.opening_hours,
        priceRange: body.price_range,
        rating: body.rating,
        imageUrl: body.image_url,
        gallery: body.gallery,
        features: body.features,
        distance: body.distance,
        isActive: body.is_active,
        isFeatured: body.is_featured,
        sortOrder: body.sort_order,
      }
    });

    // Map database fields to frontend expected fields
    const mappedAttraction = {
      id: attraction.id,
      name: attraction.name,
      slug: attraction.slug,
      description: attraction.description,
      long_description: attraction.longDescription,
      category: attraction.category,
      address: attraction.address,
      latitude: attraction.latitude,
      longitude: attraction.longitude,
      phone: attraction.phone,
      website: attraction.website,
      email: attraction.email,
      opening_hours: attraction.openingHours,
      price_range: attraction.priceRange,
      rating: attraction.rating,
      image_url: attraction.imageUrl,
      gallery: attraction.gallery,
      features: attraction.features,
      distance: attraction.distance,
      is_active: attraction.isActive,
      is_featured: attraction.isFeatured,
      sort_order: attraction.sortOrder,
      created_at: attraction.createdAt.toISOString(),
      updated_at: attraction.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedAttraction },
      { headers }
    );
  } catch (error) {
    console.error('Error updating attraction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update attraction' },
      { status: 500, headers }
    );
  }
}

// DELETE /api/attractions/[id] - Delete attraction
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid attraction ID' },
        { status: 400, headers }
      );
    }

    await prisma.attraction.delete({
      where: { id }
    });

    return NextResponse.json(
      { success: true, message: 'Attraction deleted successfully' },
      { headers }
    );
  } catch (error) {
    console.error('Error deleting attraction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete attraction' },
      { status: 500, headers }
    );
  }
}
