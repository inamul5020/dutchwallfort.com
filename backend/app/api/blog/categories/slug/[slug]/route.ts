import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const category = await prisma.blogCategory.findUnique({
      where: { slug: params.slug },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { 
          status: 404,
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: category.id,
        slug: category.slug,
        name: category.name,
        description: category.description,
        color: category.color,
        is_active: category.isActive,
        post_count: category._count.posts,
        created_at: category.createdAt.toISOString(),
        updated_at: category.updatedAt.toISOString(),
      }
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    console.error('Error fetching blog category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog category' },
      { 
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    );
  }
}
