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
      nights,
      pricePerNight,
      cleaningFee,
      subtotal,
      totalPrice,
    } = await request.json();

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

    // Generate unique payment reference
    const paymentReference = `CS-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Set booking expiry to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Insert booking into Supabase with pending payment status
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
        nights: nights,
        price_per_night: pricePerNight,
        cleaning_fee: cleaningFee,
        subtotal: subtotal,
        total_price: totalPrice,
        special_requests: message || null,
        status: "pending",
        booking_status: "pending",
        payment_reference: paymentReference,
        booking_expires_at: expiresAt.toISOString(),
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
      subject: `Payment Required - Casa Sueño Booking`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Payment Required - Casa Sueño</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your booking request! To confirm your reservation, please transfer the total amount within 24 hours.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
            <p><strong>Check-in:</strong> ${format(new Date(checkin), "MMMM d, yyyy")}</p>
            <p><strong>Check-out:</strong> ${format(new Date(checkout), "MMMM d, yyyy")}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Nights:</strong> ${nights}</p>
            <p><strong>Payment Reference:</strong> <span style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${paymentReference}</span></p>
          </div>

          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">💳 Payment Instructions</h3>
            <p><strong>Amount to transfer:</strong> €${totalPrice}</p>
            <p><strong>Beneficiary:</strong> AMBER VAN GEERT</p>
            <p><strong>IBAN:</strong> ES44 1583 0001 1290 9729 5996</p>
            <p><strong>BIC/SWIFT:</strong> REVOESM2</p>
            <p><strong>Bank:</strong> Revolut Bank UAB</p>
            <p><strong>Reference:</strong> <span style="background: #fef3c7; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-weight: bold;">${paymentReference}</span></p>
            
            <p style="color: #dc2626; font-weight: bold; margin-top: 15px;">⏰ Please transfer within 24 hours to secure your booking.</p>
            <p style="font-size: 14px; color: #6b7280;">Your booking expires on ${format(expiresAt, "MMMM d, yyyy 'at' HH:mm")} if payment is not received.</p>
          </div>

          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">Price Breakdown</h4>
            <p>Accommodation (${nights} nights × €${pricePerNight}): €${subtotal}</p>
            <p>Utilities & Cleaning: €${cleaningFee}</p>
            <hr style="border: 1px solid #d1d5db;">
            <p><strong>Total: €${totalPrice}</strong></p>
          </div>

          ${
            message
              ? `
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">Your Message</h4>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          `
              : ""
          }

          <p>Once we receive your payment, you'll receive a confirmation email with check-in details.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>Casa Sueño Team</p>
        </div>
      `,
    };

    // Send notification email to property owner
    const toEmail = process.env.EMAIL_TO || "contact@andreasulvund.no";
    const ownerEmailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: `New Booking Request - ${name} (${format(new Date(checkin), "MMM d")} - ${format(new Date(checkout), "MMM d")})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">New Booking Request - Payment Pending</h2>
          
          <p>A new booking request has been submitted. Awaiting payment confirmation.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Guest Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          </div>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
            <p><strong>Check-in:</strong> ${format(new Date(checkin), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Check-out:</strong> ${format(new Date(checkout), "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Nights:</strong> ${nights}</p>
            <p><strong>Payment Reference:</strong> <span style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${paymentReference}</span></p>
            <p><strong>Booking expires:</strong> ${format(expiresAt, "MMMM d, yyyy 'at' HH:mm")}</p>
          </div>

          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">Price Breakdown</h4>
            <p>Accommodation: €${subtotal}</p>
            <p>Utilities & Cleaning: €${cleaningFee}</p>
            <hr style="border: 1px solid #d1d5db;">
            <p><strong>Total Expected: €${totalPrice}</strong></p>
          </div>

          ${
            message
              ? `
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">Guest Message</h4>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          `
              : ""
          }

          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📋 Next Steps</h3>
            <ol style="margin: 10px 0; padding-left: 20px;">
              <li>Check your Revolut account for incoming payment with reference: <strong>${paymentReference}</strong></li>
              <li>Once payment is received, log into the admin panel</li>
              <li>Click "Mark as Paid" for this booking</li>
              <li>Guest will automatically receive confirmation email</li>
            </ol>
            <p style="margin-top: 15px; font-size: 14px; color: #92400e;">
              <strong>Important:</strong> If payment is not received within 24 hours, the booking will expire automatically.
            </p>
          </div>

          <p style="text-align: center; margin-top: 20px;">
            <a href="https://casa-sueno.com/admin" style="background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Admin Panel</a>
          </p>
        </div>
      `,
    };

    try {
      // Send emails
      await resend.emails.send(guestEmailOptions);
      await resend.emails.send(ownerEmailOptions);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the booking if email fails, but log the error
      console.error(
        "Failed to send confirmation emails, but booking was successful"
      );
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        payment_reference: paymentReference,
        expires_at: expiresAt.toISOString(),
      },
      message:
        "Booking request created. Please check your email for payment instructions.",
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
