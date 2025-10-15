import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "../../../../lib/supabase";
import { format, parseISO } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: "Missing booking ID" },
        { status: 400 }
      );
    }

    // Get booking details
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Send confirmation email to guest
    const fromEmail = process.env.EMAIL_FROM || "contact@andreasulvund.no";
    const confirmationEmail = {
      from: fromEmail,
      to: booking.guest_email,
      subject: `Booking Confirmed - Casa Sueño`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">✅ Payment Confirmed - Booking Complete!</h2>
          
          <p>Dear ${booking.guest_name},</p>
          
          <p>Great news! We've received your payment and your booking is now confirmed. We're excited to welcome you to Casa Sueño!</p>
          
          <div style="background: #f0fdf4; border: 2px solid #16a34a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #15803d; margin-top: 0;">Booking Confirmed</h3>
            <p><strong>Check-in:</strong> ${format(parseISO(booking.start_date), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Check-out:</strong> ${format(parseISO(booking.end_date), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Booking Reference:</strong> <span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${booking.payment_reference || `CS-${booking.id.slice(-8).toUpperCase()}`}</span></p>
          </div>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Check-in Information</h3>
            <p><strong>Check-in time:</strong> From 3:00 PM onwards</p>
            <p><strong>Check-out time:</strong> Before 11:00 AM</p>
            <p style="margin-top: 15px;">Detailed check-in instructions and property access codes will be sent to you 24-48 hours before your arrival.</p>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">Important Reminders</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Please arrive during check-in hours (3:00 PM - 8:00 PM)</li>
              <li>If arriving late, please notify us in advance</li>
              <li>Review our house rules before arrival</li>
            </ul>
          </div>

          ${
            booking.special_requests
              ? `
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">Your Special Requests</h4>
            <p style="font-style: italic;">"${booking.special_requests}"</p>
            <p style="font-size: 14px; color: #6b7280;">We'll do our best to accommodate your requests.</p>
          </div>
          `
              : ""
          }

          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">Need Help?</h4>
            <p>If you have any questions or need assistance, don't hesitate to contact us:</p>
            <p><strong>Email:</strong> info@casa-sueno.com<br>
            <strong>Phone:</strong> +34 623 545 857</p>
          </div>

          <p>We look forward to welcoming you to Casa Sueño!</p>
          
          <p>Best regards,<br>The Casa Sueño Team</p>
        </div>
      `,
    };

    try {
      await resend.emails.send(confirmationEmail);
      return NextResponse.json({
        success: true,
        message: "Confirmation email sent successfully",
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send confirmation email",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Confirmation email error:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}
