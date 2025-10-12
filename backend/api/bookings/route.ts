import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schema for booking data
const bookingSchema = z.object({
  guestName: z.string().min(1, "Guest name is required"),
  guestEmail: z.string().email("Valid email is required"),
  guestPhone: z.string().min(1, "Phone number is required"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  roomId: z.string().min(1, "Room selection is required"),
  guests: z.number().min(1, "Number of guests must be at least 1"),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = bookingSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation failed",
          details: validationResult.error.errors
        },
        { status: 400 }
      )
    }
    
    const bookingData = validationResult.data
    
    // In a real application, you would:
    // 1. Validate that the room exists and is available
    // 2. Check for date conflicts
    // 3. Save to database using Prisma
    // 4. Send confirmation email
    
    // For now, we'll just return a success response
    const booking = {
      id: Math.random().toString(36).substr(2, 9), // Generate a temporary ID
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Log the booking (in production, this would be saved to database)
    console.log("New booking received:", booking)
    
    return NextResponse.json({
      success: true,
      message: "Booking request received successfully",
      data: {
        bookingId: booking.id,
        status: booking.status,
        message: "We will contact you shortly to confirm your booking."
      }
    })
    
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process booking request' },
      { status: 500 }
    )
  }
}
