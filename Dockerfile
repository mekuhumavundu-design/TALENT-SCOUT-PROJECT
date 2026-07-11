FROM node:22-alpine

# Install pnpm and tsx globally
RUN npm install -g pnpm tsx

WORKDIR /app

# Enable dependency hoisting so modules are fully visible
RUN echo "shamefully-hoist=true" > .npmrc

# Copy all workspace files
COPY pnpm-workspace.yaml package.json tsconfig*.json ./
COPY apps ./apps
COPY lib ./lib

# Install all dependencies across the monorepo
RUN pnpm install --no-frozen-lockfile

# Run the root TypeScript file directly using tsx
CMD ["tsx", "apps/server/index.ts"]