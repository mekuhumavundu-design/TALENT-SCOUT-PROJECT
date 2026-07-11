FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Enable dependency hoisting so sub-packages can see everything seamlessly
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all configurations and files in their exact original structure
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies across the entire monorepo
RUN pnpm install --no-frozen-lockfile

# Compile the server and its exact internal dependencies from the root context
RUN pnpm --filter graceful-heart-server... run build

# Start the server directly from its compiled location in the workspace
CMD ["node", "apps/server/dist/index.js"]