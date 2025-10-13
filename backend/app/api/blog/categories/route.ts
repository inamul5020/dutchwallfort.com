import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const where: any = {};
    if (active === 'true') {
      where.isActive = true;
    }

    const categories = await prisma.blogCategory.findMany({
      where,
      include: {
        _count: {
          select: { posts: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    // Map database fields to frontend format
    const mappedCategories = categories.map(category => ({
      id: category.id,
      slug: category.slug,
      name: category.name,
      description: category.description,
      color: category.color,
      is_active: category.isActive,
      post_count: category._count.posts,
      created_at: category.createdAt.toISOString(),
      updated_at: category.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: mappedCategories
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog categories' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color, slug } = body;

    // Generate slug if not provided
    const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const category = await prisma.blogCategory.create({
      data: {
        name,
        description,
        color: color || '#3B82F6',
        slug: categorySlug,
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        id: category.id,
        slug: category.slug,
        name: category.name,
        description: category.description,
        color: category.color,
        is_active: category.isActive,
        created_at: category.createdAt.toISOString(),
        updated_at: category.updatedAt.toISOString(),
      }
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    console.error('Error creating blog category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog category' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
