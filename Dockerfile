FROM node:22-alpine

# Install pnpm and ts-node globally
RUN npm install -g pnpm ts-node

WORKDIR /app

# Enable dependency hoisting so TypeScript can see everything cleanly
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all workspace configurations and files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies across the entire monorepo
RUN pnpm install --no-frozen-lockfile

# Start the application using ts-node directly from the source entry point
# (Assuming your entry file is src/index.ts — change to apps/server/index.ts if it lives in the root of the server folder)
CMD ["ts-node", "apps/server/src/index.ts"]