const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

exports.sendVerificationEmail = async (to, token) => {
  const verificationLink = `http://localhost:8080/verify/${token}`;
  const mailOptions = {
    from: '"Cozy Game" <no-reply@cozygame.com>',
    to,
    subject: "🌸 Verify Your Cozy Account",
    html: `
      <p>Hello 👋,</p>
      <p>Thanks for signing up! Please verify your email by clicking the button below:</p>
      <a href="${verificationLink}" style="background:#cb446c;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">Verify Email</a>
      <p>Or use this link: <a href="${verificationLink}">${verificationLink}</a></p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
