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

// GET /api/gallery/[id] - Get gallery image by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image ID' },
        { status: 400, headers }
      );
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id }
    });

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404, headers }
      );
    }

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
      { headers }
    );
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery image' },
      { status: 500, headers }
    );
  }
}

// PUT /api/gallery/[id] - Update gallery image
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image ID' },
        { status: 400, headers }
      );
    }

    const body = await request.json();

    const image = await prisma.galleryImage.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.image_url,
        thumbnailUrl: body.thumbnail_url,
        category: body.category,
        altText: body.alt_text,
        sortOrder: body.sort_order,
        isActive: body.is_active,
        isFeatured: body.is_featured,
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
      { headers }
    );
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery image' },
      { status: 500, headers }
    );
  }
}

// DELETE /api/gallery/[id] - Delete gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image ID' },
        { status: 400, headers }
      );
    }

    await prisma.galleryImage.delete({
      where: { id }
    });

    return NextResponse.json(
      { success: true, message: 'Image deleted successfully' },
      { headers }
    );
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery image' },
      { status: 500, headers }
    );
  }
}
