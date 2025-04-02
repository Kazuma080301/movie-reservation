const nodemailer = require("nodemailer");

// 🔹 Configure Nodemailer Transport
const transporter = nodemailer.createTransport({
    service: "gmail", // Using Gmail SMTP
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail address
        pass: process.env.EMAIL_PASS   // App Password (not your Gmail password)
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Movie Reservation" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });
        console.log(`📩 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = sendEmail;