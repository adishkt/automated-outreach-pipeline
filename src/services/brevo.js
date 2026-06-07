const axios = require("axios");
require("dotenv").config();

async function sendEmail(
    recipientEmail,
    recipientName,
    subject,
    htmlContent
) {
    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: process.env.SENDER_NAME,
                    email: process.env.SENDER_EMAIL
                },
                to: [
                    {
                    email: recipientEmail,
                    name: recipientName
                    }
                ],
                subject,
                htmlContent
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );
        return response.data;
    } catch (error){
        console.error(
            "Brevo Email Error:",
            error.response?.data || error.message

        );

    }
}

module.exports = { sendEmail }; 