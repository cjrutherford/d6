# Backend Dockerfile for building and serving both API and Angular client
FROM node:20 AS build
WORKDIR /app

# Install backend dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy backend source
COPY . .

# Build backend
RUN npm run build

# Build Angular client
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build -- --output-path=dist

# Production image
FROM node:20-slim AS prod
ARG NODE_ENV=production
WORKDIR /app

# Copy backend build output
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/dist ./dist

# Copy frontend build output
COPY --from=build /app/client/dist ./client/dist

ENV NODE_ENV=${NODE_ENV}
EXPOSE 4000
CMD ["node", "dist/src/main.js", "--env", "${NODE_ENV}"]
