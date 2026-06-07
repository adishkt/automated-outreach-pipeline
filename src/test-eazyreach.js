const {
    findEmails
} = require("./services/eazyreach");

(async () => {

    const result =
        await findEmails(
            "https://www.linkedin.com/in/vishaw-vikas-601997198"
        );

    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );

})();