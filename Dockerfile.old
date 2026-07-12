FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Enable dependency hoisting so workspace packages talk to each other seamlessly
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all configurations and workspace files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib
COPY scripts ./scripts

# Install all dependencies across the monorepo
RUN pnpm install --no-frozen-lockfile

# Let pnpm run the start command directly inside the server's context
CMD ["pnpm", "--filter", "graceful-heart-server", "run", "dev"]