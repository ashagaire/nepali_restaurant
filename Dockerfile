# Use non-Alpine Node for Windows dev (less build issues)
FROM node:20-alpine AS base

# Set working directory
WORKDIR /src

# Install dependencies for native builds (optional, just in case)
# RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Set database URL for Prisma
# ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma client
# RUN npx prisma generate

# Expose port
EXPOSE 3000

# Dev command (hot reload)
CMD ["npm", "run", "dev"]
