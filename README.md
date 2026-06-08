# Automated Outreach Pipeline

## Overview

Automated Outreach Pipeline is a Node.js application that automates lead discovery and outreach using real-world APIs.

Starting with a single company domain, the system:

1. Finds similar companies using Ocean.io
2. Identifies decision makers using Prospeo
3. Generates personalized outreach information
4. Sends emails using Brevo

The project is designed with a modular architecture, error handling, and a safety confirmation step before emails are sent.

---

## Architecture

```text
User Input
    ↓
Ocean.io
    ↓
Similar Companies
    ↓
Prospeo
    ↓
Decision Makers
    ↓
Safety Checkpoint
    ↓
Brevo
    ↓
Email Sent
```

---

## Features

* Domain-based company discovery
* Decision-maker identification
* Founder and C-suite targeting
* Automated email generation
* Email delivery through Brevo
* Interactive terminal input
* Safety confirmation before sending emails
* Modular service architecture
* Graceful error handling

---

## Tech Stack

* Node.js
* Axios
* Dotenv

### APIs Used

* Ocean.io API
* Prospeo API
* Brevo API

---

## Project Structure

```text
src
│
├── index.js
│
└── services
    ├── ocean.js
    ├── prospeo.js
    ├── prospeo-enrich.js
    └── brevo.js
```

### index.js

Main workflow controller.

### ocean.js

Retrieves similar companies using Ocean.io.

### prospeo.js

Searches for decision makers based on company domain.

### prospeo-enrich.js

Enriches leads with verified contact information.

### brevo.js

Handles email delivery.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd automated-outreach-pipeline
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
OCEAN_API_KEY=your_ocean_api_key

PROSPEO_API_KEY=your_prospeo_api_key

BREVO_API_KEY=your_brevo_api_key

TEST_EMAIL=your_email@example.com
```

---

## Running The Project

Start the application:

```bash
node src/index.js
```

Example:

```text
Enter company domain: openai.com
```

---

## Example Workflow

```text
Input Domain
    ↓
openai.com
    ↓
Ocean.io Similar Companies
    ↓
Prospeo Decision Makers
    ↓
Founder / CEO Found
    ↓
Safety Confirmation
    ↓
Brevo Email Delivery
```

---

## Error Handling

The application handles:

* Missing companies
* Missing leads
* Invalid API responses
* API rate limits
* Email delivery failures

The application exits gracefully without crashing.

---

## Challenges Faced

### Ocean.io Authentication

Configured API token authentication and request validation.

### Prospeo Rate Limits

Handled API restrictions and reduced unnecessary requests.

### Email Enrichment

Implemented enrichment support for retrieving verified emails when available.

---

## Future Improvements

* Web dashboard interface
* CSV export of leads
* Email open and click tracking
* Scheduled outreach campaigns
* AI-generated email personalization
* CRM integration

---

## Evaluation Criteria Coverage

### End-to-End Workflow

Input domain to email delivery.

### Real API Integrations

Ocean.io, Prospeo, and Brevo.

### Clean Architecture

Service-based modular design.

### Resilience

Handles failures and rate limits gracefully.

### Good Judgment

User confirmation before sending emails.

### Bonus

Personalized outreach email content.

---

## Author

Adish KT

Built as part of the Automated Outreach Pipeline assignment.
