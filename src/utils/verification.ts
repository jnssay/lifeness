require('dotenv').config();

import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Lifeness!',
        html: `<p>Please verify your email by clicking on the link: <a href="${process.env.NEXTAUTH_URL}/verify?token=${token}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
}
