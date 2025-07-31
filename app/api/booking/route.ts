import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "../../../lib/supabase";
import { format } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      totalPrice,
    } = await request.json();

    console.log("Booking request received:", {
      name,
      email,
      checkin,
      checkout,
    });

    // Validate required fields
    if (!name || !email || !checkin || !checkout || !guests) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 }
      );
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not found in environment variables");
    }

    // Insert booking into Supabase
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        start_date: checkin,
        end_date: checkout,
        guests: guests,
        user_id: null,
        guest_name: name,
        guest_email: email,
        guest_phone: phone || null,
        total_price: totalPrice,
        special_requests: message || null,
        status: "confirmed",
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking error:", bookingError);
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    // Send confirmation email to guest
    const fromEmail = process.env.EMAIL_FROM || "contact@andreasulvund.no";

    const guestEmailOptions = {
      from: fromEmail,
      to: email,
      subject: `Booking Confirmation - Casa Sueño`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Booking Confirmation - Casa Sueño</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for booking your stay at Casa Sueño! We're excited to welcome you to our beautiful Spanish retreat.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
            <p><strong>Check-in:</strong> ${format(new Date(checkin), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Check-out:</strong> ${format(new Date(checkout), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Total Price:</strong> €${totalPrice}</p>
            ${message ? `<p><strong>Special Requests:</strong> ${message}</p>` : ""}
          </div>
          
          <h3 style="color: #374151;">Check-in Information</h3>
          <p>Check-in is available from 3:00 PM onwards. Please let us know your expected arrival time.</p>
          
          <h3 style="color: #374151;">Contact Information</h3>
          <p>If you have any questions or need to make changes to your booking, please contact us:</p>
          <p>Email: info@casasueno.com<br>
          Phone: +34 123 456 789</p>
          
          <p>We look forward to hosting you at Casa Sueño!</p>
          
          <p>Best regards,<br>
          The Casa Sueño Team</p>
        </div>
      `,
    };

    // Send notification email to property owner
    const toEmail = process.env.EMAIL_TO || "info@casasueno.com";
    const ownerEmailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: `New Booking - ${name} (${format(new Date(checkin), "MMM d")} - ${format(new Date(checkout), "MMM d")})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">New Booking Received</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Guest Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            
            <h3 style="color: #374151;">Booking Details</h3>
            <p><strong>Check-in:</strong> ${format(new Date(checkin), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Check-out:</strong> ${format(new Date(checkout), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Total Price:</strong> €${totalPrice}</p>
            ${message ? `<p><strong>Special Requests:</strong> ${message}</p>` : ""}
          </div>
          
          <p>The guest has been sent a confirmation email.</p>
        </div>
      `,
    };

    try {
      // Send guest confirmation email first
      console.log(`Sending confirmation email to guest: ${email}`);
      const guestEmailResult = await resend.emails.send(guestEmailOptions);
      console.log("Guest email sent successfully:", guestEmailResult);

      // Send owner notification email
      console.log(`Sending notification email to owner: ${toEmail}`);
      const ownerEmailResult = await resend.emails.send(ownerEmailOptions);
      console.log("Owner email sent successfully:", ownerEmailResult);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the booking if email fails, but log the error
      console.error(
        "Failed to send confirmation emails, but booking was successful"
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking confirmed and confirmation emails sent successfully",
      booking: booking,
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
