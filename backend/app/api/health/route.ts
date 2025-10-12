import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Dutch Wall Fort API",
    version: "3.0.0",
    status: "running"
  });
}
