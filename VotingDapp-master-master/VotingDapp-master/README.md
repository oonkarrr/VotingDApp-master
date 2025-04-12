# Web3 Voting Application

## Overview

This project is a Web3-based voting system that utilizes blockchain technology to ensure secure and transparent voting. The application is built with a Vite React JS frontend and an Express.js backend, communicating with an Ethereum smart contract deployed on a local blockchain (Ganache).

## Features

- **Gender Verification**: Ensures that the provided gender is valid.
- **Time-Bound Voting**: Allows voting within a specific time frame.
- **Candidate Verification**: Ensures there are no party clashes and that the candidate's gender is valid before registration.

## Tech Stack

- **Frontend**: Vite, React JS
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethereum, Web3.js, Ganache
- **Smart Contract**: Solidity

## Prerequisites

- Node.js (v14 or later)
- Ganache CLI or Ganache GUI
- MetaMask extension (for interacting with the DApp)
- Truffle or Hardhat (for smart contract deployment)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/web3-voting-app.git
   cd web3-voting-app
   ```

2. **Install dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Start Ganache**:
   - Run Ganache CLI:
     ```bash
     ganache-cli
     ```
   - Or open Ganache GUI and start a new workspace.

4. **Deploy the Smart Contract**:
   - Use Truffle or Hardhat to deploy the smart contract to the local blockchain.
   - Update the contract address and ABI in the backend code (`contractAddress` and `ABI.json`).

5. **Run the Backend Server**:
   ```bash
   cd backend
   node index.js
   ```

6. **Run the Frontend Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.
   - Or visit the deployed version at [https://votingdv.netlify.app/](https://votingdv.netlify.app/).

## API Endpoints

- **POST /api/voter-verification**
  - Verifies the gender of the voter.

- **POST /api/time-bound**
  - Starts the voting timer and checks if it falls within the allowed time frame.

- **POST /api/candidate-verification**
  - Verifies the candidate's gender and checks for any party clashes.
