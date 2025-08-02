import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(request: NextRequest) {
  try {
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
    } = await request.json();

    // Validate required fields
    if (!name || !email || !checkin || !checkout || !guests || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Casa Sueño - ${nights} night${nights !== 1 ? "s" : ""}`,
              description: `Stay from ${checkin} to ${checkout} for ${guests} guest${guests !== 1 ? "s" : ""}`,
            },
            unit_amount: subtotal * 100, // Stripe expects amount in cents
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
            unit_amount: cleaningFee * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/`,
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
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
