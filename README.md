# CamelMailer with Node.js

This example shows how to use [CamelMailer](https://camelmailer.com) with [Node.js](https://nodejs.org): a plain send, a send with a stored template, and a batch send — all through the [camelmailer](https://github.com/camelmailer/camelmailer-node) SDK.

## Prerequisites

- Node.js 20+
- A CamelMailer server API key (dashboard → your server → **Credentials** → new credential of type **API**)

## Instructions

1. Install dependencies:

   ```sh
   npm install
   ```

   > The SDK is installed straight from GitHub until it is published to npm. After publishing, `npm install camelmailer` works too.

2. Set your environment:

   ```sh
   export CAMELMAILER_API_KEY="cm_xxxx"
   # Self-hosted instance? Point the SDK at it (defaults to https://app.camelmailer.com):
   export CAMELMAILER_BASE_URL="https://mail.example.com"
   # Sender/recipient used by the example:
   export CAMELMAILER_FROM="you@yourdomain.com"
   export CAMELMAILER_TO="delivered@example.com"
   ```

3. Run it:

   ```sh
   npm run dev
   ```

## License

MIT License
