import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        room: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Map database fields to frontend expected fields
    const mappedBookings = bookings.map(booking => ({
      ...booking,
      full_name: booking.guestName,
      email: booking.guestEmail,
      phone: booking.guestPhone,
      check_in: booking.checkIn,
      check_out: booking.checkOut,
      adults: booking.guests,
      children: 0, // Default value since we don't track children separately
      room_preference: booking.room?.name || 'Not specified',
      message: booking.message || '',
      contact_method: 'email', // Default value
      created_at: booking.createdAt,
      updated_at: booking.updatedAt
    }));

    return NextResponse.json({
      success: true,
      data: mappedBookings,
      count: mappedBookings.length
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const booking = await prisma.booking.create({
      data: {
        guestName: body.guestName,
        guestEmail: body.guestEmail,
        guestPhone: body.guestPhone,
        checkIn: new Date(body.checkIn),
        checkOut: new Date(body.checkOut),
        roomId: body.roomId,
        guests: body.guests,
        message: body.message || '',
        status: body.status || 'pending',
      },
      include: {
        room: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: booking
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}
