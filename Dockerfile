ARG PORT=3032

# Use Alpine Linux which has a smaller footprint
FROM node:16-alpine as node

#
# Development/Build Container
#

FROM node

WORKDIR /app

# Install node dependencies
COPY package.json package-lock.json ./
RUN npm install

# Compile application
COPY . .

# Open desired port
EXPOSE ${PORT}

# Dev entry point
ENTRYPOINT ["npm", "run", "start"]


