FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy all workspace configurations and files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies
RUN pnpm install --no-frozen-lockfile

# Compile the entire monorepo so all builds are generated
RUN pnpm run build

# Use pnpm's deploy mechanism to isolate the server for production
RUN pnpm --filter graceful-heart-server deploy /app/deployed-server

# Move context over to our standalone deployed server folder
WORKDIR /app/deployed-server

# Start the application directly from the isolated environment
CMD ["node", "dist/index.js"]