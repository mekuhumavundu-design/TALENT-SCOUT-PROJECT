FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy all workspace configurations and files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies across the monorepo
RUN pnpm install --no-frozen-lockfile

# Prune and deploy the server into an isolated, standalone production folder
RUN pnpm --filter graceful-heart-server deploy /app/deployed-server

# Move our working environment into the deployed server folder
WORKDIR /app/deployed-server

# Compile the TypeScript files inside the isolated production bundle
RUN pnpm run build

# Start the application directly using standard Node from the build folder
CMD ["node", "dist/index.js"]