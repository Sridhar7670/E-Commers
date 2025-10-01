# FROM node:20-alpine AS base

# WORKDIR /app

# FROM base AS dependencies

# COPY package.json yarn.lock ./

# RUN yarn install --frozen-lockfile

# FROM dependencies AS build

# COPY . .

# RUN yarn build

# FROM base AS production

# ENV NODE_ENV=production

# COPY --from=dependencies /app/node_modules ./node_modules
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/public ./public
# COPY --from=build /app/next.config.ts ./next.config.ts
# COPY --from=build /app/package.json ./package.json

# CMD ["yarn", "start"]


# # ---------- Base ----------
# FROM node:20-alpine AS base
# WORKDIR /app

# # ---------- Dependencies ----------
# FROM base AS deps
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# # ---------- Build ----------
# FROM base AS build
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN yarn build

# # ---------- Production ----------
# FROM node:20-alpine AS production
# WORKDIR /app
# ENV NODE_ENV=production

# # Install only prod deps
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile --production

# # Copy build artifacts
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/public ./public
# COPY --from=build /app/package.json ./package.json

# EXPOSE 3000
# CMD ["yarn", "start"]




# musch lesser size
# Stage 1: Dependency Installation
# Installs all dependencies, including devDependencies needed for building.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---

# Stage 2: Code Builder
# Copies dependencies and source code, then builds the application.
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept the variable as a build-time argument
ARG NEXT_PUBLIC_BACKEND_URL
# Set it as an environment variable FOR THE BUILD PROCESS
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

RUN yarn build

# ---

# Stage 3: Production Runner
# This is the final, small image that will be deployed.
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for better security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy the standalone output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

# Start the server
CMD ["node", "server.js"]