const axios = require("axios");
require("dotenv").config();

async function enrichPerson(personId) {

    try {

        const response = await axios.post(
            "https://api.prospeo.io/enrich-person",
            {
                data: {
                    person_id: personId
                }
            },
            {
                headers: {
                    "X-KEY": process.env.PROSPEO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            error.response?.data ||
            error.message
        );

        return [];
    }
}

module.exports = { enrichPerson };