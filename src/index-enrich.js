const readline = require("readline");

const { findSimilarCompanies } =
    require("./services/ocean");

const { findDecisionMakers } =
    require("./services/prospeo");

const { enrichPerson } =
    require("./services/prospeo-enrich");

const { sendEmail } =
    require("./services/brevo");

require("dotenv").config();

function askDomain() {

    const rl =
        readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    return new Promise((resolve) => {

        rl.question(
            "\nEnter company domain: ",
            (domain) => {

                rl.close();

                resolve(
                    domain.trim()
                );
            }
        );
    });
}

function askConfirmation() {

    const rl =
        readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    return new Promise((resolve) => {

        rl.question(
            "\nSend email? (yes/no): ",
            (answer) => {

                rl.close();

                resolve(
                    answer
                        .trim()
                        .toLowerCase()
                );
            }
        );
    });
}

async function main() {

    const inputDomain =
        await askDomain();

    console.log(
        `\nSearching similar companies for ${inputDomain}...`
    );

    const oceanData =
        await findSimilarCompanies(
            inputDomain
        );

    if (!oceanData) {

        console.log(
            "Ocean API failed."
        );

        return;
    }

    const companies =
        (oceanData.companies || []).slice(0, 2);

    if (companies.length === 0) {

        console.log(
            "No companies found."
        );

        return;
    }

    console.log(
        "\n=== Similar Companies ==="
    );

    companies
        .slice(0, 5)
        .forEach((item, index) => {

            console.log(
                `${index + 1}. ${
                    item.company?.name ||
                    "N/A"
                } (${
                    item.company?.domain ||
                    "N/A"
                })`
            );
        });

    let leads = null;
    let selectedCompany = null;

   function sleep(ms) {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }

    for (const item of companies) {

        const domain =
            item.company?.domain;

        if (!domain) continue;

        console.log(
            `\nTrying ${domain}...`
        );

        await sleep(2000);

        leads =
            await findDecisionMakers(
                domain
            );

        if (
            !leads ||
            leads.length === 0
        ) {
            continue;
        }

        selectedCompany =
            domain;

        break;
    }

    if (
        !leads ||
        leads.length === 0
    ) {

        console.log(
            "\nNo leads found."
        );

        return;
    }
    // leads.forEach(
    // (lead, index) => {

    //     console.log(
    //         `\nLead ${index + 1}`
    //     );
    const lead =
        leads[0];
// for (const lead of leads) {
    console.log(
        "\n=== Lead Found ==="
    );

    console.log(
        "Name:",
        lead.person?.full_name ||
        "N/A"
    );

    console.log(
        "Title:",
        lead.person?.current_job_title ||
        "N/A"
    );

    console.log(
        "LinkedIn:",
        lead.person?.linkedin_url ||
        "N/A"
    );

    const personId =
        lead.person?.person_id;

    if (!personId) {

        console.log(
            "No person_id found."
        );

        return;
    }

    console.log(
        "\nEnriching lead..."
    );

    const enrichedLead =
        await enrichPerson(
            personId
        );

    if (
        !enrichedLead ||
        enrichedLead.error
    ) {

        console.log(
            "Enrichment failed."
        );

        return;
    }

    const email =
        enrichedLead.person?.email
            ?.email;

    if (!email) {

        console.log(
            "No verified email found."
        );

        return;
    }

    console.log(
        "\n=== Enriched Lead ==="
    );

    console.log(
        "Email:",
        email
    );

    const confirmation =
        await askConfirmation();

    if (confirmation !== "yes") {

        console.log(
            "\nEmail cancelled by user."
        );

        return;
    }

    console.log(
        "\nSending Email..."
    );

    // for (const lead of leads) {

    // const email =
    //     lead.person?.email?.email;

    // if (!email) {
    //     continue;
    // }

    const result =
        await sendEmail(
            email,

            lead.person?.full_name,

            "Quick Collaboration Opportunity",

            `
            <h2>Hello ${
                lead.person?.full_name
            },</h2>

            <p>
                I came across your profile while researching companies in your industry and noticed your role as
                <b>${
                    lead.person?.current_job_title
                }</b>.
            </p>

            <p>
                I'm working on an automated outreach and lead discovery platform and thought there could be an interesting opportunity to connect.
            </p>

            <p>
                If you're open to a brief conversation, I'd be happy to share more details.
            </p>

            <p>
                Looking forward to hearing from you.
            </p>

            <br>

            <p>
                Best regards,<br>
                Adish KT
            </p>
            `
        );

    console.log(
        "\n=== Email Sent ==="
    );

    console.log(
        "Recipient:",
        email
    );
// }
    console.log(result);
}

main();