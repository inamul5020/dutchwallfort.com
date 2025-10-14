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

// GET /api/services/[id] - Get service by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid service ID' },
        { status: 400, headers }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404, headers }
      );
    }

    // Map database fields to frontend expected fields
    const mappedService = {
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      price_currency: service.priceCurrency,
      category: service.type,
      is_active: service.isActive,
      created_at: service.createdAt.toISOString(),
      updated_at: service.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedService },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service' },
      { status: 500, headers }
    );
  }
}

// PUT /api/services/[id] - Update service by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid service ID' },
        { status: 400, headers }
      );
    }

    const body = await request.json();

    const service = await prisma.service.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        priceCurrency: body.price_currency,
        type: body.category,
        isActive: body.is_active,
      }
    });

    // Map database fields to frontend expected fields
    const mappedService = {
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      price_currency: service.priceCurrency,
      category: service.type,
      is_active: service.isActive,
      created_at: service.createdAt.toISOString(),
      updated_at: service.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedService },
      { headers }
    );
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500, headers }
    );
  }
}

// DELETE /api/services/[id] - Delete service by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid service ID' },
        { status: 400, headers }
      );
    }

    await prisma.service.delete({
      where: { id }
    });

    return NextResponse.json(
      { success: true, message: 'Service deleted successfully' },
      { headers }
    );
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500, headers }
    );
  }
}
