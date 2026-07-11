FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Enable dependency hoisting so nested workspace packages can see each other
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all workspace configurations and files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies across the monorepo
RUN pnpm install --no-frozen-lockfile

# Start the application using your workspace's native start script
CMD ["pnpm", "--filter", "graceful-heart-server", "run", "start"]