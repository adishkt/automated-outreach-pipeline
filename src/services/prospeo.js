const axios = require("axios");
require("dotenv").config();

async function findDecisionMakers(domain) {
    try {

        const response = await axios.post(
            "https://api.prospeo.io/search-person",
            {
                page: 1,
                filters: {
                    company: {
                        websites: {
                            include: [domain]
                        }
                    },
                    person_seniority: {
                        include: [
                            "Founder/Owner",
                            "C-Suite"
                        ]
                    }
                }
            },
            {
                headers: {
                    "X-KEY": process.env.PROSPEO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.results;

    } catch (error) {
        console.error(
            error.response?.data || error.message
        );
    }
}

module.exports = { findDecisionMakers };