import { NextResponse } from "next/server";
import crypto from "crypto";

// Simple token-based admin auth
// Set ADMIN_PASSWORD in your .env.local file
function generateToken(password: string): string {
  return crypto
    .createHash("sha256")
    .update(`${password}-${process.env.ADMIN_PASSWORD}`)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin password not configured. Set ADMIN_PASSWORD in .env.local" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      // Add small delay to prevent brute force timing attacks
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateToken(password);

    return NextResponse.json({ token, expiresIn: 86400 }); // 24h
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// Verify token endpoint
export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!token || !adminPassword) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  const expectedToken = generateToken(adminPassword);
  const isValid = token === expectedToken;

  return NextResponse.json({ valid: isValid }, { status: isValid ? 200 : 401 });
}
