// Create a new file: src/app/utils/emailService.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendDonationEmail = async (
  receiverEmail,
  amount,
  senderName,
  message
) => {
  try {
    const mailOptions = {
      from: {
        name: `${senderName} - Buy Me A Beer`,
        address: process.env.GMAIL,
      },
      to: receiverEmail,
      subject: "🍺 New Beer Donation Received!",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 18px; line-height: 1.6; margin: 0; padding: 0;">
          <div style="max-width: 550px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://cdn-icons-png.flaticon.com/128/931/931949.png" alt="Beer Icon" style="width: 80px;">
                <h1 style="color: #f59e0b; margin: 15px 0; font-size: 36px;">New Beer Donation!</h1>
            </div>
            
            <div style="background-color: #f8fafc; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <p style="font-size: 20px; color: #334155; margin-bottom: 20px;">
                    Great news! You've received a new donation! 🎉
                </p>
                
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 15px; font-size: 20px;">
                        🎉 Cheers! You've just received ${
                          amount / 0.01
                        } beer 🍺 worth ${amount} SOL from your awesome friend ${senderName}.
                        🥳 Isn't this amazing? Time to raise a glass and celebrate! 🍻
                    </li>
                </ul>
            </div>

            <div style="background-color: #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h2 style="color: #334155; margin: 0 0 15px; font-size: 24px;">Message from ${senderName}:</h2>
                <p style="font-size: 20px; color: #334155; margin: 0;">
                    ${message}
                </p>
            </div>
            
            <p style="font-size: 18px; color: #64748b; text-align: center;">
                Thank you for being part of our community!<br>
                - Buy Me A Beer Team
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
