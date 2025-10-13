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

// GET /api/attractions/slug/[slug] - Get attraction by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const attraction = await prisma.attraction.findUnique({
      where: { slug }
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
      latitude: attraction.longitude,
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
    console.error('Error fetching attraction by slug:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attraction' },
      { status: 500, headers }
    );
  }
}
