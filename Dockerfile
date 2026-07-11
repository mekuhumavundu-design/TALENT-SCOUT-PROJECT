FROM node:22-alpine

# Install pnpm and tsx globally
RUN npm install -g pnpm tsx

WORKDIR /app

# Enable dependency hoisting so all workspace packages can see each other
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all workspace configurations and files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies across the monorepo
RUN pnpm install --no-frozen-lockfile

# Start the application using tsx targeting the nested src directory
CMD ["tsx", "apps/server/src/index.ts"]