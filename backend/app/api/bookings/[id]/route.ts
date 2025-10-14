import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers });
}

// GET /api/bookings/[id] - Get booking by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking ID' },
        { status: 400, headers }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        room: true
      }
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404, headers }
      );
    }

    // Map database fields to frontend expected fields
    const mappedBooking = {
      id: booking.id,
      full_name: booking.guestName,
      email: booking.guestEmail,
      phone: booking.guestPhone,
      check_in: booking.checkIn.toISOString(),
      check_out: booking.checkOut.toISOString(),
      adults: booking.guests,
      children: 0, // Not stored in current schema
      room_preference: booking.room?.name || '',
      message: booking.message || '',
      contact_method: 'email', // Default value
      status: booking.status,
      created_at: booking.createdAt.toISOString(),
      updated_at: booking.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedBooking },
      { headers }
    );
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500, headers }
    );
  }
}

// PUT /api/bookings/[id] - Update booking by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking ID' },
        { status: 400, headers }
      );
    }

    const body = await request.json();

    // Handle partial updates - only update provided fields
    const updateData: any = {};
    
    if (body.status !== undefined) {
      updateData.status = body.status;
    }
    if (body.full_name !== undefined) {
      updateData.guestName = body.full_name;
    }
    if (body.email !== undefined) {
      updateData.guestEmail = body.email;
    }
    if (body.phone !== undefined) {
      updateData.guestPhone = body.phone;
    }
    if (body.check_in !== undefined) {
      updateData.checkIn = new Date(body.check_in);
    }
    if (body.check_out !== undefined) {
      updateData.checkOut = new Date(body.check_out);
    }
    if (body.adults !== undefined) {
      updateData.guests = body.adults;
    }
    if (body.message !== undefined) {
      updateData.message = body.message;
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        room: true
      }
    });

    // Map database fields to frontend expected fields
    const mappedBooking = {
      id: booking.id,
      full_name: booking.guestName,
      email: booking.guestEmail,
      phone: booking.guestPhone,
      check_in: booking.checkIn.toISOString(),
      check_out: booking.checkOut.toISOString(),
      adults: booking.guests,
      children: 0,
      room_preference: booking.room?.name || '',
      message: booking.message || '',
      contact_method: 'email',
      status: booking.status,
      created_at: booking.createdAt.toISOString(),
      updated_at: booking.updatedAt.toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mappedBooking },
      { headers }
    );
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500, headers }
    );
  }
}

// PATCH /api/bookings/[id] - Partial update booking by ID (same as PUT for now)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // PATCH uses the same logic as PUT for partial updates
  return PUT(request, { params });
}

// DELETE /api/bookings/[id] - Delete booking by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking ID' },
        { status: 400, headers }
      );
    }

    await prisma.booking.delete({
      where: { id }
    });

    return NextResponse.json(
      { success: true, message: 'Booking deleted successfully' },
      { headers }
    );
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500, headers }
    );
  }
}
