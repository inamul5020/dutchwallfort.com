import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length
    }, { headers });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500, headers }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const review = await prisma.review.create({
      data: {
        guestName: body.guestName,
        rating: body.rating,
        comment: body.comment,
        isApproved: body.isApproved || false,
      }
    });
    
    return NextResponse.json({
      success: true,
      data: review
    }, { headers });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500, headers }
    );
  }
}
