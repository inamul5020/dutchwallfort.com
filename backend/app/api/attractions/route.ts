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

// GET /api/attractions - List all attractions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (featured === 'true') {
      where.isFeatured = true;
    }
    
    if (active !== 'false') {
      where.isActive = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } }
      ];
    }

    const attractions = await prisma.attraction.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    });

    // Map database fields to frontend expected fields
    const mappedAttractions = attractions.map(attraction => ({
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
    }));

    return NextResponse.json(
      { 
        success: true, 
        data: mappedAttractions, 
        count: mappedAttractions.length 
      },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attractions' },
      { status: 500, headers }
    );
  }
}

// POST /api/attractions - Create new attraction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const attraction = await prisma.attraction.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        longDescription: body.long_description,
        category: body.category || 'historical',
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
        phone: body.phone,
        website: body.website,
        email: body.email,
        openingHours: body.opening_hours || {},
        priceRange: body.price_range,
        rating: body.rating || 0,
        imageUrl: body.image_url,
        gallery: body.gallery || [],
        features: body.features || [],
        distance: body.distance,
        isActive: body.is_active !== false,
        isFeatured: body.is_featured || false,
        sortOrder: body.sort_order || 0,
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
      { status: 201, headers }
    );
  } catch (error) {
    console.error('Error creating attraction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create attraction' },
      { status: 500, headers }
    );
  }
}
