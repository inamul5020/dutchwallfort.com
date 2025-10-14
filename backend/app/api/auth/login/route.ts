import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../../../../lib/auth";
import { createSecureHandler } from "../../../../lib/api-middleware";

const prisma = new PrismaClient();

async function loginHandler(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token using the new auth system
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role as 'admin' | 'user'
    });

    // Return user data (without password) and token
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: userData
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const POST = createSecureHandler(loginHandler, {
  rateLimit: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 login attempts per 15 minutes
  allowedMethods: ['POST']
});

export const OPTIONS = createSecureHandler(async () => {
  return new NextResponse(null, { status: 200 });
}, { allowedMethods: ['OPTIONS'] });
