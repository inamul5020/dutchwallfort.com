import { NextResponse } from "next/server"
import { z } from "zod"

// Validation schema for contact message
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = contactSchema.safeParse(body)
    
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
    
    const messageData = validationResult.data
    
    // In a real application, you would:
    // 1. Save to database using Prisma
    // 2. Send notification email to admin
    // 3. Send auto-reply to customer
    
    // For now, we'll just return a success response
    const message = {
      id: Math.random().toString(36).substr(2, 9), // Generate a temporary ID
      ...messageData,
      status: "unread",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Log the message (in production, this would be saved to database)
    console.log("New contact message received:", message)
    
    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: {
        messageId: message.id,
        status: "sent",
        message: "Thank you for your message. We will get back to you soon."
      }
    })
    
  } catch (error) {
    console.error('Error processing contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
