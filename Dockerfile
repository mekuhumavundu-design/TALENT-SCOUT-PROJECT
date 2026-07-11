FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Enable dependency hoisting so TypeScript can see nested modules safely
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all workspace configurations and files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies
RUN pnpm install --no-frozen-lockfile

# Build ONLY the server and its local workspace dependencies (skips global root typecheck)
RUN pnpm --filter graceful-heart-server... run build

# Start the application
CMD ["pnpm", "--filter", "graceful-heart-server", "run", "start"]