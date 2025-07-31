import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Rate limiting storage (in production use Redis or database)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secure-secret-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting check
    const attempts = loginAttempts.get(clientIP);
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        const remainingTime = Math.ceil(
          (LOCKOUT_TIME - timeSinceLastAttempt) / 60000
        );
        return NextResponse.json(
          {
            error: `Too many login attempts. Try again in ${remainingTime} minutes.`,
            lockoutTime: remainingTime,
          },
          { status: 429 }
        );
      } else {
        // Reset after lockout period
        loginAttempts.delete(clientIP);
      }
    }

    // Get hashed password from environment
    const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
    if (!hashedPassword) {
      console.error("ADMIN_PASSWORD_HASH not set in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Validate password
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
      // Register failed attempt
      const currentAttempts = loginAttempts.get(clientIP) || {
        count: 0,
        lastAttempt: 0,
      };
      loginAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: Date.now(),
      });

      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Reset attempts on successful login
    loginAttempts.delete(clientIP);

    // Generate JWT token
    const token = jwt.sign(
      {
        admin: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60, // 2 hours
      },
      JWT_SECRET
    );

    // Set httpOnly cookie for security
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // 2 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
