// netlify/functions/booking-notify.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const body = await req.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            checkIn,
            checkOut,
            room,
            adults,
            children,
            specialRequests
        } = body;

        // ── Email to Guest (Confirmation) ──
        await resend.emails.send({
            from: 'Lighthouse Point Hotel <reservations@lighthousepointhotel.com>',
            to: email,
            subject: `Booking Inquiry Received — Lighthouse Point Hotel`,
            html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B2A4A; padding: 30px; text-align: center;">
            <h1 style="color: #C8A951; margin: 0;">Lighthouse Point Hotel</h1>
          </div>
          
          <div style="padding: 30px; background: #FFFFFF;">
            <h2 style="color: #1B2A4A;">Thank You, ${firstName}!</h2>
            <p style="color: #2D2D2D; line-height: 1.6;">
              We've received your booking inquiry and our reservations 
              team will confirm availability within 2 hours.
            </p>
            
            <div style="background: #F4E8D1; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1B2A4A; margin-top: 0;">Your Inquiry Details</h3>
              <p><strong>Room:</strong> ${room}</p>
              <p><strong>Check-in:</strong> ${checkIn}</p>
              <p><strong>Check-out:</strong> ${checkOut}</p>
              <p><strong>Guests:</strong> ${adults} Adults${children > 0 ? `, ${children} Children` : ''}</p>
              ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
            </div>
            
            <p style="color: #2D2D2D;">
              Questions? Call us at 
              <a href="tel:+19545550123" style="color: #3A7CA5;">(954) 555-0123</a>
            </p>
          </div>
          
          <div style="background: #1B2A4A; padding: 20px; text-align: center;">
            <p style="color: #F4E8D1; font-size: 12px; margin: 0;">
              © 2024 Lighthouse Point Hotel · 123 Coastal Drive, Lighthouse Point, FL 33064
            </p>
          </div>
        </div>
      `
        });

        // ── Email to Hotel Staff ──
        await resend.emails.send({
            from: 'Website <noreply@lighthousepointhotel.com>',
            to: 'reservations@lighthousepointhotel.com',
            subject: `🏨 New Booking Inquiry: ${firstName} ${lastName} — ${room}`,
            html: `
        <h2>New Booking Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Room</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${room}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-in</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${checkIn}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Check-out</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${checkOut}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Guests</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${adults} Adults, ${children} Children</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Requests</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${specialRequests || 'None'}</td></tr>
        </table>
      `
        });

        return new Response(
            JSON.stringify({ success: true, message: 'Emails sent' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Email error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to send email' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const config = {
    path: "/api/booking-notify"
};
