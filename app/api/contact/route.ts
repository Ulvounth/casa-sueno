import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    console.log('Received form data:', { name, email, phone, subject, message });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fromEmail = process.env.EMAIL_FROM || "default@yourdomain.com";
    const toEmail = process.env.EMAIL_TO || "default@yourdomain.com";
    
    console.log('Email config:', { fromEmail, toEmail });
    console.log('Resend API Key present:', !!process.env.RESEND_API_KEY);

    const mailoptions = {
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    try {
      console.log('Attempting to send email with mailoptions:', mailoptions);
      const result = await resend.emails.send(mailoptions);
      console.log('Resend response:', result);
      
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
        data: result
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to send email", 
          error: error instanceof Error ? error.message : String(error)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to process request",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
