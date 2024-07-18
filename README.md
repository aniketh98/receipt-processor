# Receipt Processor

This project implements a web service that processes receipts and calculates points based on specific rules.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Using Docker](#using-docker)
  - [Without Docker](#without-docker)
- [API Endpoints](#api-endpoints)
  - [Process Receipts](#process-receipts)
  - [Get Points](#get-points)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Overview

The Receipt Processor service provides two main endpoints:
1. `POST /receipts/process` - Processes a receipt and returns a unique ID.
2. `GET /receipts/{id}/points` - Returns the points awarded for the receipt with the given ID.

## Getting Started

### Prerequisites

- Docker
- Node.js
- npm (Node Package Manager)

### Project Setup

1. Clone the repository:

   git clone https://github.com/aniketh98/receipt-processor.git
   cd receipt-processor

2. Install the dependencies:

   npm install
   

## Running the Application

### Using Docker

1. Ensure Docker is installed on your system.
2. Build the Docker image:
   docker build -t receipt-processor .

3. Run the Docker container:
   docker run -p 3000:3000 receipt-processor

4. open your command prompt window and type below command to test the API:

   testing the process API:
   curl -X POST -H "Content-Type: application/json" -d @receipt.json http://localhost:3000/receipts/process
### Without Docker

1. Ensure Node.js is installed on your system.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm run build
   npm start
   ```

4. The application will be available at `http://localhost:3000`.

## API Endpoints

### Process Receipts

- **Endpoint:** `/receipts/process`
- **Method:** `POST`
- **Payload:** Receipt JSON
- **Response:** JSON containing an ID for the receipt.

#### Example Request

```bash
curl -X POST http://localhost:3000/receipts/process -H "Content-Type: application/json" -d '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },
    {
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    }
  ],
  "total": "18.74"
}'
```

#### Example Response

{
  "id": "7fb1377b-b223-49d9-a31a-5a02701dd310"
}

### Get Points

- **Endpoint:** `/receipts/{id}/points`
- **Method:** `GET`
- **Response:** JSON containing the number of points awarded.

#### Example Request
curl http://localhost:3000/receipts/7fb1377b-b223-49d9-a31a-5a02701dd310/points

#### Example Response

```json
{
  "points": 32
}

## Testing

To run tests for the application, use the following commands:

1. To run all tests:
   npm test

2. To run tests in watch mode:
   npm run test:watch

## Project Structure

```plaintext
receipt-processor/
├── src/
│   ├── app.ts
│   └── calculatePoints.ts
├── tests/
│   └── app.test.ts
├── .dockerignore
├── .gitignore
├── Dockerfile
├── jest.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Dependencies

- express: ^4.19.2
- joi: ^17.13.3
- uuid: ^10.0.0
- winston: ^3.13.1

## Dev Dependencies

- @types/express: ^4.17.21
- @types/jest: ^29.5.12
- @types/joi: ^17.2.3
- @types/node: ^20.14.10
- @types/supertest: ^6.0.2
- @types/uuid: ^10.0.0
- jest: ^29.7.0
- supertest: ^7.0.0
- ts-jest: ^29.2.2
- ts-node: ^10.9.2
- typescript: ^5.5.3
