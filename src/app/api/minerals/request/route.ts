import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, company, qty, location, products } = body;

        // Configure transport
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"CoralFil Bulk Inquiry" <${process.env.SMTP_USER}>`,
            to: 'hello@coralfil.com',
            subject: `New Bulk Minerals Inquiry from ${company || name}`,
            text: `
                New Bulk Minerals Request Info:
                -------------------------------
                Name: ${name}
                Company: ${company}
                Quantity Needed: ${qty}
                Location: ${location}
                Products: ${products.join(', ')}
            `,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #00D9C0;">New Bulk Minerals Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Quantity Needed:</strong> ${qty}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <div style="margin-top: 20px;">
                        <strong>Products of Interest:</strong>
                        <ul style="color: #666;">
                            ${products.map((p: string) => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Request sent successfully' });
    } catch (error: any) {
        console.error('Email send error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
