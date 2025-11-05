# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the frontend application
RUN npm run build

# Install serve to run production build
RUN npm install -g serve

# Expose the port the frontend runs on
EXPOSE 3000

# Start the frontend application using serve for production
CMD ["serve", "-s", "build", "-l", "3000"]

