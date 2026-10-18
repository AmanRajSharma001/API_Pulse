# ApiPulse

A lightweight Express.js middleware for monitoring API performance and request statistics.

## Features

- Track total API requests
- Monitor response times
- Count successful requests (2xx), client errors (4xx), and server errors (5xx)
- View the 20 most recent requests
- Live dashboard with automatic updates
- Lightweight in-memory storage

## Installation

```bash
npm install apipulse-express
```

Install Express in your project if you haven't already:

```bash
npm install express
```

## Usage

```js
const express = require("express");
const { apiPulse } = require("apipulse-express");

const app = express();

app.use(apiPulse);

app.get("/", (req, res) => {
    res.send("ApiPulse is working!");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

## Dashboard

ApiPulse includes a dashboard example that displays request statistics and recent requests.

To try the example from the ApiPulse project directory:

```bash
npm install
npm run dev
```

Open `http://localhost:3000/stats` in your browser.

## Limitations

- Statistics are stored in memory and reset when the server restarts.
- Statistics are maintained separately for each server process.
- The dashboard example is intended for local development. Protect monitoring endpoints before exposing them publicly.
