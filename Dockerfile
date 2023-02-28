# Pull base Node image
FROM node:18-slim as builder

# Set working directory
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY prisma-db ./prisma-db
COPY prisma-db-archive ./prisma-db-archive

# Install openssl (in order to fix a bug with Prisma)
RUN apt-get update 
RUN apt-get install -y openssl
RUN apt-get install ca-certificates

# Install app dependencies
RUN yarn install --frozen-lockfile

# Copy app source code
COPY . .

# Build app
RUN yarn build

# Production image, copy all the files and run the app
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install openssl (in order to fix a bug with Prisma)
RUN apt-get update 
RUN apt-get install -y openssl

# Copy app source code
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma-db ./prisma-db
COPY --from=builder /app/prisma-db-archive ./prisma-db-archive
COPY --from=builder /app/dist ./dist

# Expose the listening port of your app
EXPOSE 8080

# Run the app
CMD ["yarn", "start:migrate:prod"]