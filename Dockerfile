FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Enable dependency hoisting so all workspace packages can see each other
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all workspace configurations and files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies across the monorepo
RUN pnpm install --no-frozen-lockfile

# Compile the server package and its internal dependencies
RUN pnpm --filter graceful-heart-server... run build

# Start the application using your workspace's native start script
CMD ["pnpm", "--filter", "graceful-heart-server", "run", "start"]