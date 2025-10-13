import { NextResponse } from "next/server";

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers });
}

export async function GET() {
  return NextResponse.json({
    message: "Dutch Wall Fort API",
    version: "3.7.0",
    status: "running"
  }, { headers });
}
