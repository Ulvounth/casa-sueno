import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Rate limiting storage (i produksjon bruk Redis eller database)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutter
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secure-secret-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting sjekk
    const attempts = loginAttempts.get(clientIP);
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        const remainingTime = Math.ceil(
          (LOCKOUT_TIME - timeSinceLastAttempt) / 60000
        );
        return NextResponse.json(
          {
            error: `For mange innloggingsforsøk. Prøv igjen om ${remainingTime} minutter.`,
            lockoutTime: remainingTime,
          },
          { status: 429 }
        );
      } else {
        // Reset etter lockout periode
        loginAttempts.delete(clientIP);
      }
    }

    // Hent hashet passord fra environment
    const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
    if (!hashedPassword) {
      console.error("ADMIN_PASSWORD_HASH ikke satt i miljøvariabler");
      return NextResponse.json(
        { error: "Server konfigurasjonsfeil" },
        { status: 500 }
      );
    }

    // Valider passord
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
      // Registrer feilet forsøk
      const currentAttempts = loginAttempts.get(clientIP) || {
        count: 0,
        lastAttempt: 0,
      };
      loginAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: Date.now(),
      });

      return NextResponse.json({ error: "Feil passord" }, { status: 401 });
    }

    // Reset forsøk ved vellykket innlogging
    loginAttempts.delete(clientIP);

    // Generer JWT token
    const token = jwt.sign(
      {
        admin: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60, // 2 timer
      },
      JWT_SECRET
    );

    // Set httpOnly cookie for sikkerhet
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // 2 timer
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
