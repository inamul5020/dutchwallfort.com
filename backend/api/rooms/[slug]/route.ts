import { NextResponse } from "next/server"

// Mock data - in a real app, this would come from the database via Prisma
const rooms = [
  {
    id: "deluxe-family-room",
    slug: "deluxe-family-room",
    name: "Deluxe Family Room",
    shortDescription: "Spacious family room with balcony and garden view",
    longDescription: "Our most spacious accommodation offers the perfect blend of comfort and charm for families visiting Galle Fort. This room features a private balcony overlooking our lush garden, comfortable sleeping arrangements, and all modern amenities.",
    capacity: 4,
    beds: "1 double bed + 2 single beds",
    amenities: ["Air conditioning", "Private bathroom", "Balcony", "Garden view", "Free Wi-Fi", "Work desk", "Daily housekeeping", "Mini fridge"],
    price: 15000,
    images: ["/images/bedroom1_1.jpg", "/images/bedroom1_2.jpg", "/images/bedroom1_3.jpg"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "superior-room",
    slug: "superior-room",
    name: "Superior Room",
    shortDescription: "Comfortable room with private entrance and work area",
    longDescription: "The Superior Room offers an ideal balance of space, comfort, and privacy for couples or small families. With its own private entrance and dedicated work area, this room is perfect for both leisure and business travelers.",
    capacity: 3,
    beds: "1 double bed + 1 single bed",
    amenities: ["Air conditioning", "Private bathroom", "Private entrance", "Work desk", "Free Wi-Fi", "Daily housekeeping", "Tea & coffee maker"],
    price: 12000,
    images: ["/images/bedroom2_1.jpg", "/images/bedroom2_2.jpg", "/images/bedroom2_3.jpg"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "standard-room",
    slug: "standard-room",
    name: "Standard Room",
    shortDescription: "Cozy room with all essential amenities",
    longDescription: "Our Standard Room may be cozy in size, but it is generous in comfort and style. Perfect for couples seeking an authentic Galle Fort experience, this room provides everything you need for a comfortable stay.",
    capacity: 2,
    beds: "1 double bed",
    amenities: ["Air conditioning", "Private bathroom", "Free Wi-Fi", "Daily housekeeping", "Tea & coffee maker"],
    price: 9000,
    images: ["/images/bedroom3_1.jpg", "/images/bedroom3_2.jpg"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "heritage-suite",
    slug: "heritage-suite",
    name: "Heritage Suite",
    shortDescription: "Luxurious suite with colonial architecture",
    longDescription: "Experience the grandeur of Dutch colonial architecture in our Heritage Suite. This spacious room features high ceilings, antique furniture, and a separate living area.",
    capacity: 2,
    beds: "1 king bed",
    amenities: ["Air conditioning", "Private bathroom", "Separate living area", "Bathtub", "Garden view", "Free Wi-Fi", "Work desk", "Mini bar"],
    price: 18000,
    images: ["/images/bedroom4_1.jpg", "/images/bedroom4_2.jpg"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params
    
    // Find room by slug
    const room = rooms.find(r => r.slug === slug && r.isActive)
    
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: room
    })
  } catch (error) {
    console.error('Error fetching room:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch room' },
      { status: 500 }
    )
  }
}
