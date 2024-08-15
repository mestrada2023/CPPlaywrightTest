# Use the official Node.js image from the Docker Hub
FROM node:16-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required by Playwright
RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates && \
    apt-get install -y --no-install-recommends \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxkbcommon0 libgtk-3-0 libgbm1 \
    libasound2 libxshmfence1 libegl1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install
RUN npx playwright install chromium

# Copy the rest of the application code to the working directory
COPY . .

# Install Playwright and its dependencies
RUN npx playwright install

# Run the Playwright tests
CMD ["npx", "playwright", "test"]

