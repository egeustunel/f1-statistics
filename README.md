# Formula 1 API

## Overview

The Formula 1 API provides endpoints for accessing various statistics related to Formula 1 racing, including driver and team statistics, season data, and user management. This project is built with Node.js and TypeScript and uses PostgreSQL for data storage.

## Project Structure

- **Routes**:
  - `/drivers`: Endpoints related to driver statistics.
  - `/seasons`: Endpoints related to season statistics.
  - `/teams`: Endpoints related to team statistics.
  - `/user`: Endpoints for user authentication and registration.

- **Controllers**:
  - `driverController.ts`: Handles driver-related logic.
  - `seasonController.ts`: Handles season-related logic.
  - `teamController.ts`: Handles team-related logic.
  - `userController.ts`: Handles user authentication and registration.

- **Middlewares**:
  - `authMiddleware.ts`: Middleware for handling authentication.

## Setup

### Installation

