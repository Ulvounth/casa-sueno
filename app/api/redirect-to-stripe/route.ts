import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      checkin,
      checkout,
      guests,
      message,
      nights,
      pricePerNight,
      cleaningFee,
      subtotal,
      totalPrice,
      longStayDiscount = 0,
      hasLongStayDiscount = false,
    } = body;

    // Build line items array
    const lineItems = [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `Casa Sueño - ${nights} night${nights !== 1 ? "s" : ""}`,
            description: `Stay from ${checkin} to ${checkout} for ${guests} guest${
              guests !== 1 ? "s" : ""
            }${hasLongStayDiscount ? " (with 20% long stay discount)" : ""}`,
          },
          unit_amount: subtotal * 100, // Convert to cents (already includes discount)
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Cleaning Fee",
            description: "Professional cleaning service",
          },
          unit_amount: cleaningFee * 100, // Convert to cents
        },
        quantity: 1,
      },
    ];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: email,
      metadata: {
        name,
        email,
        phone: phone || "",
        checkin,
        checkout,
        guests: guests.toString(),
        message: message || "",
        nights: nights.toString(),
        pricePerNight: pricePerNight.toString(),
        cleaningFee: cleaningFee.toString(),
        subtotal: subtotal.toString(),
        totalPrice: totalPrice.toString(),
        longStayDiscount: longStayDiscount.toString(),
        hasLongStayDiscount: hasLongStayDiscount.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin}/?cancelled=true`,
    });

    // Return redirect URL instead of session ID
    return NextResponse.json({
      redirectUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
