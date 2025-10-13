import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendBookingConfirmation, sendBookingNotificationToAdmin } from "../../lib/mailjet";

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
        status: 'pending', // Always start as pending
      },
      include: {
        room: true
      }
    });

    // Calculate total nights and estimated price
    const checkInDate = new Date(body.checkIn);
    const checkOutDate = new Date(body.checkOut);
    const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const roomPrice = booking.room ? parseFloat(booking.room.price.toString()) : 0;
    const estimatedPrice = roomPrice * totalNights;

    // Send email notifications
    try {
      // Send confirmation email to guest (pending status)
      await sendBookingConfirmation({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        roomName: booking.room?.name || 'Any Room',
        guests: booking.guests,
        totalNights: totalNights,
        estimatedPrice: estimatedPrice,
        message: booking.message,
        status: 'pending',
      });

      // Send notification email to admin
      await sendBookingNotificationToAdmin({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        roomName: booking.room?.name || 'Any Room',
        guests: booking.guests,
        message: booking.message,
      });

      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
      // Don't fail the booking if email fails
    }
    
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
