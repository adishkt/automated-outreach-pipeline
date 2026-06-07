const readline = require("readline");

const { findSimilarCompanies } =
    require("./services/ocean");

const { findDecisionMakers } =
    require("./services/prospeo");

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
                resolve(domain.trim());
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
        oceanData.companies || [];

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
                    item.company?.name || "N/A"
                } (${
                    item.company?.domain || "N/A"
                })`
            );
        });

    let leads = null;
    let selectedCompany = null;

    for (const item of companies) {

        const domain =
            item.company?.domain;

        if (!domain) continue;

        console.log(
            `\nTrying ${domain}...`
        );

        leads =
            await findDecisionMakers(
                domain
            );

        if (
            leads &&
            leads.length > 0
        ) {

            selectedCompany =
                domain;

            break;
        }
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

    console.log(
        `\n=== Leads Found for ${selectedCompany} ===`
    );

    console.log(
        `Total Leads: ${leads.length}`
    );

    const lead =
        leads[0];

    console.log(
        "\nLead Details"
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

    const result =
        await sendEmail(
            process.env.TEST_EMAIL,

            lead.person?.full_name ||
            "User",

            `Opportunity for ${selectedCompany}`,

            `
            <h2>Hello ${
                lead.person?.full_name ||
                "there"
            }</h2>

            <p>
                This email was generated
                through the automated
                outreach pipeline.
            </p>

            <p>
                Company:
                ${selectedCompany}
            </p>

            <p>
                Job Title:
                ${
                    lead.person?.current_job_title ||
                    "N/A"
                }
            </p>

            <p>
                LinkedIn:
                ${
                    lead.person?.linkedin_url ||
                    "N/A"
                }
            </p>
            `
        );

    console.log(
        "\n=== Brevo Result ==="
    );

    console.log(result);
}

main();