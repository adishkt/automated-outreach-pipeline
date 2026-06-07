const { findSimilarCompanies } =
    require("./services/ocean");

const { findDecisionMakers } =
    require("./services/prospeo");

async function main() {

    const oceanData =
        await findSimilarCompanies("openai.com");

    if (!oceanData) {
        console.log("Ocean API failed.");
        return;
    }

    const companies =
        oceanData.companies || [];

    if (companies.length === 0) {
        console.log("No companies found.");
        return;
    }

    console.log(
        "\n=== Similar Companies ==="
    );

    companies.slice(0, 5).forEach(
        (item, index) => {

            console.log(
                `${index + 1}. ${
                    item.company?.name || "N/A"
                } (${
                    item.company?.domain || "N/A"
                })`
            );
        }
    );

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
            await findDecisionMakers(domain);

        if (leads && leads.length > 0) {
            selectedCompany = domain;
            break;
        }
    }

    if (!leads || leads.length === 0) {
        console.log(
            "\nNo leads found for any company."
        );
        return;
    }

    console.log(
        `\n=== Leads Found for ${selectedCompany} ===`
    );

    console.log(
        `Total Leads: ${leads.length}`
    );

    leads.slice(0, 5).forEach(
        (lead, index) => {

            console.log(
                `\nLead ${index + 1}`
            );

            console.log(
                "Name:",
                lead.person?.full_name || "N/A"
            );

            console.log(
                "Title:",
                lead.person?.current_job_title || "N/A"
            );

            console.log(
                "LinkedIn:",
                lead.person?.linkedin_url || "N/A"
            );
        }
    );
}

main();