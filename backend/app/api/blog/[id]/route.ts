import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers });
}

// GET /api/blog/[id] - Get blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog post ID' },
        { status: 400, headers }
      );
    }

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404, headers }
      );
    }

    // Map database fields to frontend expected fields
    const mappedPost = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featuredImage,
      author: post.author,
      is_published: post.isPublished,
      published_at: post.publishedAt?.toISOString(),
      created_at: post.createdAt.toISOString(),
      updated_at: post.updatedAt.toISOString(),
      category: post.category ? {
        id: post.category.id,
        slug: post.category.slug,
        name: post.category.name,
        color: post.category.color,
      } : null,
    };

    return NextResponse.json(
      { success: true, data: mappedPost },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500, headers }
    );
  }
}

// PUT /api/blog/[id] - Update blog post by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog post ID' },
        { status: 400, headers }
      );
    }

    const body = await request.json();

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        featuredImage: body.featured_image,
        author: body.author,
        isPublished: body.is_published,
        publishedAt: body.published_at ? new Date(body.published_at) : null,
        categoryId: body.category_id,
      },
      include: {
        category: true
      }
    });

    // Map database fields to frontend expected fields
    const mappedPost = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featuredImage,
      author: post.author,
      is_published: post.isPublished,
      published_at: post.publishedAt?.toISOString(),
      created_at: post.createdAt.toISOString(),
      updated_at: post.updatedAt.toISOString(),
      category: post.category ? {
        id: post.category.id,
        slug: post.category.slug,
        name: post.category.name,
        color: post.category.color,
      } : null,
    };

    return NextResponse.json(
      { success: true, data: mappedPost },
      { headers }
    );
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500, headers }
    );
  }
}

// DELETE /api/blog/[id] - Delete blog post by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog post ID' },
        { status: 400, headers }
      );
    }

    await prisma.blogPost.delete({
      where: { id }
    });

    return NextResponse.json(
      { success: true, message: 'Blog post deleted successfully' },
      { headers }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500, headers }
    );
  }
}
