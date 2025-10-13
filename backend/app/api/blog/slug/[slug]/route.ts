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
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        category: true
      }
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { 
          status: 404,
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
    }

    // Map database fields to frontend format
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

    return NextResponse.json({
      success: true,
      data: mappedPost
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { 
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    );
  }
}
