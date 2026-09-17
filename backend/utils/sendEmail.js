import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  // If email credentials are not set up, gracefully log the message instead of throwing an unhandled exception
  if (!user || !pass) {
    console.log("📨 [Email Service Mock]: No SMTP credentials configured. Notification logged:");
    console.log(`To: ${to || "Admin <admin@eventplanner.com>"}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${text}`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `"Event Planner Platform" <${user}>`,
      to: to || user,
      subject,
      text,
      html: html || undefined,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("⚠️ Email sending failed:", err.message);
    // Return gracefully so the user inquiry is still saved and acknowledged
    return { success: false, error: err.message };
  }
};
