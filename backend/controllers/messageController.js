import { sendEmail } from "../utils/sendEmail.js";

import { Message } from "../models/messageSchema.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1️⃣ Save to database
    const saved = await Message.create({
      name,
      email,
      subject,
      message,
    });

    console.log("✅ Message saved in DB:", saved._id);

    // 2️⃣ Send email to admin
    await sendEmail({
      subject: "📩 New Contact Message - Event Planner",
      text: `
New message received:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`,
    });

    // 3️⃣ Respond to frontend
    res.status(200).json({
      message: "Message Sent Successfully!",
    });

  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
