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

// GET /api/gallery - List all gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    const limit = searchParams.get('limit');

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

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    });

    // Map database fields to frontend expected fields
    const mappedImages = images.map(image => ({
      id: image.id,
      title: image.title,
      description: image.description,
      image_url: image.imageUrl,
      thumbnail_url: image.thumbnailUrl,
      category: image.category,
      alt_text: image.altText,
      sort_order: image.sortOrder,
      is_active: image.isActive,
      is_featured: image.isFeatured,
      created_at: image.createdAt.toISOString(),
      updated_at: image.updatedAt.toISOString(),
    }));

    return NextResponse.json(
      { 
        success: true, 
        data: mappedImages, 
        count: mappedImages.length 
      },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery images' },
      { status: 500, headers }
    );
  }
}

// POST /api/gallery - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const image = await prisma.galleryImage.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.image_url,
        thumbnailUrl: body.thumbnail_url,
        category: body.category || 'general',
        altText: body.alt_text,
        sortOrder: body.sort_order || 0,
        isActive: body.is_active !== false,
        isFeatured: body.is_featured || false,
      }
    });

    // Map database fields to frontend expected fields
    const mappedImage = {
      id: image.id,
      title: image.title,
      description: image.description,
      image_url: image.imageUrl,
      thumbnail_url: image.thumbnailUrl,
      category: image.category,
      alt_text: image.altText,
      sort_order: image.sortOrder,
      is_active: image.isActive,
      is_featured: image.isFeatured,
      created_at: image.createdAt.toISOString(),
      updated_at: image.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedImage },
      { status: 201, headers }
    );
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery image' },
      { status: 500, headers }
    );
  }
}
