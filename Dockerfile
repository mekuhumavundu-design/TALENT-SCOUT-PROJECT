FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Enable dependency hoisting
RUN echo "shamefully-hoist=true" > .npmrc

# Copy workspace configurations and tsconfigs
COPY pnpm-workspace.yaml package.json tsconfig*.json ./

# Copy all project directories
COPY apps ./apps
COPY lib ./lib

# Install all dependencies
RUN pnpm install --no-frozen-lockfile

# Directly build ONLY the server application (bypassing global root typechecks)
RUN pnpm --filter graceful-heart-server run build

# Start the application
CMD ["pnpm", "--filter", "graceful-heart-server", "run", "start"]