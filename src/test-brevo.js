const {
    sendEmail
} = require("./services/brevo");

(async () => {

    const result =
        await sendEmail(
            "your_email@gmail.com",
            "Adish",
            "Test Email",
            "<h1>Hello from Brevo</h1>"
        );

    console.log(result);

})();