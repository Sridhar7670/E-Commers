# Dockerfile

# ---- Stage 1: Base Image ----
# This is a common base we'll use in other stages to keep things consistent.
# Using 'alpine' makes the image smaller.
FROM node:20-alpine AS base

# Set the working directory INSIDE the container's virtual filesystem.
# All subsequent commands will run from here.
WORKDIR /usr/src/app

# ---- Stage 2: Install Dependencies ----
# We create a separate stage for dependencies to leverage Docker's caching.
# This stage only re-runs if your package.json or yarn.lock file changes.
FROM base AS dependencies

# Copy the package list and lock file.
COPY package.json yarn.lock ./

# Install dependencies using the exact versions from yarn.lock for a reliable build.
RUN yarn install --frozen-lockfile

# ---- Stage 3: Build the Application ----
# In this stage, we'll compile your TypeScript code into JavaScript.
FROM dependencies AS build

# Copy the rest of your application's source code.
COPY . .

# Run the build script defined in your package.json (e.g., nest build).
# This creates the 'dist' folder with the compiled JavaScript.
RUN yarn build

# ---- Stage 4: Production Image ----
# This is the final, optimized image that will be deployed.
# We start from the clean 'base' stage to keep it as small as possible.
FROM base AS production

# Set the standard environment variable for production optimizations.
ENV NODE_ENV=production

# Copy ONLY the production node_modules from the 'dependencies' stage.
# We don't need the development dependencies in the final image.
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy the compiled application code from the 'build' stage.
COPY --from=build /usr/src/app/dist ./dist

# Tell Docker that the container will listen on port 3000 at runtime.
EXPOSE 3000

# The command to start your application.
# This executes the main.js file inside the compiled 'dist' folder.
CMD ["node", "dist/main"]