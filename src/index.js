require("dotenv").config();

console.log("Ocean:", process.env.OCEAN_API_KEY ? "Loaded" : "Missing");
console.log("Prospeo:", process.env.PROSPEO_API_KEY ? "Loaded" : "Missing");
console.log("EazyReach Client ID:", process.env.EAZYREACH_CLIENT_ID ? "Loaded" : "Missing");
console.log("EazyReach Secret:", process.env.EAZYREACH_CLIENT_SECRET ? "Loaded" : "Missing");
console.log("Brevo:", process.env.BREVO_API_KEY ? "Loaded" : "Missing");