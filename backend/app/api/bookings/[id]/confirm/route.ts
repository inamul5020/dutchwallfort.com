import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendBookingConfirmation } from "../../../../lib/mailjet";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking ID' },
        { 
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
    }

    // Update booking status to confirmed
    const booking = await prisma.booking.update({
      where: { id },
      data: { 
        status: 'confirmed',
        updatedAt: new Date()
      },
      include: {
        room: true
      }
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { 
          status: 404,
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
    }

    // Calculate total nights and estimated price
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const roomPrice = booking.room ? parseFloat(booking.room.price.toString()) : 0;
    const estimatedPrice = roomPrice * totalNights;

    // Send confirmation email to guest
    try {
      await sendBookingConfirmation({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        checkIn: booking.checkIn.toISOString().split('T')[0],
        checkOut: booking.checkOut.toISOString().split('T')[0],
        roomName: booking.room?.name || 'Any Room',
        guests: booking.guests,
        totalNights: totalNights,
        estimatedPrice: estimatedPrice,
        message: booking.message,
        status: 'confirmed',
      });

      console.log('Booking confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the confirmation if email fails
    }

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking confirmed successfully'
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to confirm booking' },
      { 
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    );
  }
}
