FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy all workspace configurations and tsconfig base files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./

# Copy all project directories
COPY apps ./apps
COPY lib ./lib

# Install dependencies without expecting a lockfile
RUN pnpm install --no-frozen-lockfile

# Build the workspace packages
RUN pnpm run build

# Start the application
CMD ["pnpm", "--filter", "graceful-heart-server", "run", "start"]