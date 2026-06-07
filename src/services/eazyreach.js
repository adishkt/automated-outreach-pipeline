const axios = require("axios");
require("dotenv").config();

async function getAuthToken() {
    try {
        const response = await axios.post(
            "https://api.superflow.run/b2b/createAuthToken/",
            {
                clientId: process.env.EAZYREACH_CLIENT_ID,
                clientSecret: process.env.EAZYREACH_CLIENT_SECRET
            }
        );

        console.log(response.data);

        return response.data.authToken;

    } catch (error) {
        console.error(
            "Auth Error:",
            error.response?.data || error.message
        );
    }
}

async function findEmails(linkedinUrl) {

    try {

        const token =
            await getAuthToken();

        console.log(
            "Token received:",
            token ? "YES" : "NO"
        );

        const response =
            await axios.post(
                "https://api.superflow.run/b2b/linkedin-emails",
                {
                    linkedinUrl
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json"
                    }
                }
            );

        return response.data;

    } catch (error) {

        console.error(
            "Email Lookup Error:",
            error.response?.data ||
            error.message
        );
    }
}

module.exports = {
    findEmails
};