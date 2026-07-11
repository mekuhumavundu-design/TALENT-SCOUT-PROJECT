FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace configurations
COPY pnpm-workspace.yaml package.json ./

# Copy all project directories
COPY apps ./apps
COPY lib ./lib

# Install dependencies and build the packages
RUN pnpm install --no-frozen-lockfile
RUN pnpm run build

# Start the application
CMD ["pnpm", "--filter", "graceful-heart-server", "run", "start"]