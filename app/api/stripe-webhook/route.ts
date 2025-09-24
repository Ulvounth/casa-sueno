import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { supabase } from "../../../lib/supabase";
import { format } from "date-fns";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("Webhook received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract booking data from metadata
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
    } = session.metadata!;

    try {
      // Insert booking into Supabase
      const { error: bookingError } = await supabase.from("bookings").insert({
        start_date: checkin,
        end_date: checkout,
        guests: parseInt(guests),
        user_id: null,
        guest_name: name,
        guest_email: email,
        guest_phone: phone || null,
        nights: parseInt(nights),
        price_per_night: parseFloat(pricePerNight),
        cleaning_fee: parseFloat(cleaningFee),
        subtotal: parseFloat(subtotal),
        total_price: parseFloat(totalPrice),
        special_requests: message || null,
        status: "confirmed",
        stripe_session_id: session.id,
        payment_status: "paid",
      });

      if (bookingError) {
        console.error("Booking error:", bookingError);
        return NextResponse.json(
          { error: "Failed to create booking" },
          { status: 500 }
        );
      }

      // Send confirmation emails
      const fromEmail = process.env.EMAIL_FROM || "contact@andreasulvund.no";

      // Guest confirmation email
      const guestEmailOptions = {
        from: fromEmail,
        to: email,
        subject: `Booking Confirmation - Casa Sueño`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d97706;">Booking Confirmation - Casa Sueño</h2>
            
            <p>Dear ${name},</p>
            
            <p>Thank you for booking your stay at Casa Sueño! Your payment has been successfully processed and your booking is confirmed.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
              <p><strong>Check-in:</strong> ${format(new Date(checkin), "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Check-out:</strong> ${format(new Date(checkout), "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Guests:</strong> ${guests}</p>
              
              <h4 style="color: #374151; margin-bottom: 10px;">Price Breakdown</h4>
              <div style="margin-left: 10px;">
                <p>€${pricePerNight} × ${nights} night${parseInt(nights) !== 1 ? "s" : ""}: <strong>€${subtotal}</strong></p>
                <p>Cleaning fee: <strong>€${cleaningFee}</strong></p>
                <hr style="border: 1px solid #e5e7eb; margin: 10px 0;">
                <p style="font-size: 18px;"><strong>Total: €${totalPrice}</strong></p>
                <p style="color: #10b981; font-weight: bold;">✓ Payment Confirmed</p>
              </div>
              
              ${message ? `<p><strong>Special Requests:</strong> ${message}</p>` : ""}
            </div>
            
            <h3 style="color: #374151;">Check-in Information</h3>
            <p>Check-in is available from 3:00 PM onwards. Please let us know your expected arrival time.</p>
            
            <h3 style="color: #374151;">Contact Information</h3>
            <p>If you have any questions or need to make changes to your booking, please contact us:</p>
            <p><strong>Booking Reference:</strong> CS-${session.id.slice(-8).toUpperCase()}</p>
            <p>Email: info@casasueno.com<br>
            Phone: +34 623 545 857</p>
            
            <p>We look forward to hosting you at Casa Sueño!</p>
            
            <p>Best regards,<br>
            The Casa Sueño Team</p>
          </div>
        `,
      };

      // Owner notification email
      const toEmail = process.env.EMAIL_TO || "info@casasueno.com";
      const ownerEmailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: `New Paid Booking - ${name} (${format(new Date(checkin), "MMM d")} - ${format(new Date(checkout), "MMM d")})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d97706;">New Paid Booking Received</h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Guest Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              
              <h3 style="color: #374151;">Booking Details</h3>
              <p><strong>Check-in:</strong> ${format(new Date(checkin), "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Check-out:</strong> ${format(new Date(checkout), "EEEE, MMMM d, yyyy")}</p>
              <p><strong>Guests:</strong> ${guests}</p>
              
              <h4 style="color: #374151; margin-bottom: 10px;">Price Breakdown</h4>
              <div style="margin-left: 10px;">
                <p>€${pricePerNight} × ${nights} night${parseInt(nights) !== 1 ? "s" : ""}: <strong>€${subtotal}</strong></p>
                <p>Cleaning fee: <strong>€${cleaningFee}</strong></p>
                <hr style="border: 1px solid #e5e7eb; margin: 10px 0;">
                <p style="font-size: 18px;"><strong>Total: €${totalPrice}</strong></p>
                <p style="color: #10b981; font-weight: bold;">✓ Payment Confirmed via Stripe</p>
              </div>
              
              ${message ? `<p><strong>Special Requests:</strong> ${message}</p>` : ""}
            </div>
            
            <p><strong>Booking Reference:</strong> CS-${session.id.slice(-8).toUpperCase()}</p>
            <p>Stripe Session ID: ${session.id}</p>
          </div>
        `,
      };

      // Send emails
      console.log("Sending emails with phone:", "+34 623 545 857");
      console.log(
        "Booking reference:",
        `CS-${session.id.slice(-8).toUpperCase()}`
      );
      await resend.emails.send(guestEmailOptions);
      await resend.emails.send(ownerEmailOptions);

      // Create booking and send emails
      await resend.emails.send(guestEmailOptions);
      await resend.emails.send(ownerEmailOptions);
    } catch (error) {
      console.error("Error processing payment confirmation:", error);
      return NextResponse.json(
        { error: "Failed to process booking" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
