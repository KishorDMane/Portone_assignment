# PortOne Backend API

## Description
This repository contains the backend implementation for the PortOne hiring assignment. It includes APIs for integrating with the Stripe Payment Gateway.

## Table of Contents
- [Setup](#setup)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Setup
To set up the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd portone-backend`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```
5. Start the server: `node index.js`
6. The server will be running on `http://localhost:8000` by default.

## Endpoints
The following endpoints are available:

1. **Create Intent for Payment**:
   - Method: POST
   - URL: `/api/v1/create_intent`
   - Description: Creates an intent for payment in the Stripe Payment Gateway.

2. **Capture the Created Intent**:
   - Method: POST
   - URL: `/api/v1/capture_intent/:id`
   - Description: Captures the created payment intent.

3. **Create Refund for the Created Intent**:
   - Method: POST
   - URL: `/api/v1/create_refund/:id`
   - Description: Creates a refund for the specified payment intent.

4. **Get a List of All Intents**:
   - Method: GET
   - URL: `/api/v1/get_intents`
   - Description: Retrieves a list of all payment intents.
