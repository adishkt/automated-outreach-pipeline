const { findSimilarCompanies } = require("./services/ocean");

(async () => {
    const result = await findSimilarCompanies("openai.com");
    console.log(JSON.stringify(result, null, 2));
})();