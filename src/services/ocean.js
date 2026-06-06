const axios = require("axios");
require("dotenv").config();

async function findSimilarCompanies(domain){
    try {
        const response = await axios.post(
            "https://api.ocean.io/v3/search/companies",
            {
                size: 10,
                companiesFilters:{
                    lookalikeDomains: [domain]

                }
            },
            {
                headers:{
                    "X-Api-Token": process.env.OCEAN_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch(error){
        console.error(
            error.response?.data || error.message
        );
    }
}

module.exports = { findSimilarCompanies };