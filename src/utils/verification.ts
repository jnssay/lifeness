require('dotenv').config();

import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string, username: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "Lifeness",
        to: email,
        subject: `Welcome to Lifeness!`,
        html: `
        <div style="font-family: Calibri, sans-serif;">
            <h1 style="color: #E83E8C; margin-bottom: 10px;">Welcome to Lifeness, ${username}!</h1>
            <p style="color: #E83E8C; font-size: 14px;">Please verify your email by clicking on the link below:</p>
            <a href="${process.env.NEXTAUTH_URL}/verify?token=${token}" style="display: inline-block; background-color: #E83E8C; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px; margin-bottom: 10px;">Verify Email</a>
            </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}
