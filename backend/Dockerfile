# # Dockerfile
# 625 MB 
# # ---- Stage 1: Base Image ----
# # This is a common base we'll use in other stages to keep things consistent.
# # Using 'alpine' makes the image smaller.
# FROM node:20-alpine AS base

# # Set the working directory INSIDE the container's virtual filesystem.
# # All subsequent commands will run from here.
# WORKDIR /usr/src/app

# # ---- Stage 2: Install Dependencies ----
# # We create a separate stage for dependencies to leverage Docker's caching.
# # This stage only re-runs if your package.json or yarn.lock file changes.
# FROM base AS dependencies

# # Copy the package list and lock file.
# COPY package.json yarn.lock ./

# # Install dependencies using the exact versions from yarn.lock for a reliable build.
# RUN yarn install --frozen-lockfile

# # ---- Stage 3: Build the Application ----
# # In this stage, we'll compile your TypeScript code into JavaScript.
# FROM dependencies AS build

# # Copy the rest of your application's source code.
# COPY . .

# # Run the build script defined in your package.json (e.g., nest build).
# # This creates the 'dist' folder with the compiled JavaScript.
# RUN yarn build

# # ---- Stage 4: Production Image ----
# # This is the final, optimized image that will be deployed.
# # We start from the clean 'base' stage to keep it as small as possible.
# FROM base AS production

# # Set the standard environment variable for production optimizations.
# ENV NODE_ENV=production

# # Copy ONLY the production node_modules from the 'dependencies' stage.
# # We don't need the development dependencies in the final image.
# COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# # Copy the compiled application code from the 'build' stage.
# COPY --from=build /usr/src/app/dist ./dist

# # Tell Docker that the container will listen on port 3000 at runtime.
# EXPOSE 3000

# # The command to start your application.
# # This executes the main.js file inside the compiled 'dist' folder.
# CMD ["node", "dist/main"]\


# Dockerfile
# 800MB 
# # ---- Stage 1: Base Image ----
# FROM node:20-alpine AS base
# WORKDIR /usr/src/app

# # ---- Stage 2: Install All Dependencies (including dev) ----
# # This stage is used by the 'build' stage and is properly cached.
# FROM base AS dependencies
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# # ---- Stage 3: Build the Application ----
# # This stage uses the dependencies to build the production code.
# FROM base AS build
# COPY . .
# # Copy node_modules from the 'dependencies' stage
# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# RUN yarn build

# # ---- Stage 4: Production Image (Optimized) ----
# # This is the final, small image. We start fresh from 'base'.
# FROM base AS production
# ENV NODE_ENV=production

# # Copy package files
# COPY package.json yarn.lock ./

# # ✅ KEY CHANGE: Install ONLY production dependencies.
# # This creates a much smaller node_modules folder.
# RUN yarn install --production --frozen-lockfile

# # Copy the compiled application code from the 'build' stage.
# COPY --from=build /usr/src/app/dist ./dist

# EXPOSE 3000
# CMD ["node", "dist/main"]



    # Dockerfile
    # 324MB
    # ---- Stage 1: Base Image ----
    FROM node:20-alpine AS base
    WORKDIR /usr/src/app

    # ---- Stage 2: Build Dependencies ----
    # Install ALL dependencies (dev included) needed for the build process.
    FROM base AS build-deps
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile

    # ---- Stage 3: Build the Application ----
    # Use the full dependencies to build the application source code.
    FROM base AS builder
    COPY . .
    COPY --from=build-deps /usr/src/app/node_modules ./node_modules
    RUN yarn build

    # ---- Stage 4: Production Dependencies ----
    # ✅ NEW STAGE: Create a clean node_modules with ONLY production packages.
    FROM base AS prod-deps
    COPY package.json yarn.lock ./
    RUN yarn install --production --frozen-lockfile

    # ---- Stage 5: Final Production Image ----
    # Start fresh and copy only what is absolutely needed.
    FROM base AS production
    ENV NODE_ENV=production

    # Copy the lean, production-only node_modules from the 'prod-deps' stage.
    COPY --from=prod-deps /usr/src/app/node_modules ./node_modules

    # Copy the compiled application code from the 'builder' stage.
    COPY --from=builder /usr/src/app/dist ./dist

    EXPOSE 3000
    CMD ["node", "dist/main"]