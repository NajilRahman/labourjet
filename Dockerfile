# Step 1: Build the React application using Vite
FROM node:20-alpine AS build-stage

WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Run the build script (Vite will embed .env variables here)
RUN npm run build

# Step 2: Serve static files using Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from the build stage to Nginx web root
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 (standard HTTP port)
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
