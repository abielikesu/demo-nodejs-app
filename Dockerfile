ARG NODE_VERSION=16

# Use Alpine Linux which has a smaller footprint
FROM node:${NODE_VERSION}-alpine as node
#
# Development/Build Container
#

FROM node as final

WORKDIR /app

# Install node dependencies
COPY package.json package-lock.json ./
RUN npm install

# Compile application
COPY . .

# Open desired port
EXPOSE 3032

# Dev entry point
ENTRYPOINT ["npm", "run", "start"]


