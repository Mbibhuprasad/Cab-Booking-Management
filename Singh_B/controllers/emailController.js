import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, // admin email
        pass: process.env.ADMIN_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.ADMIN_EMAIL, // admin gets the mail
      subject: `New Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Failed to send email." });
  }
};
