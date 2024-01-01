# Set the BUILD time image version to use
ARG node_image_version=16

# Use Alpine Linux which has a smaller footprint
FROM node:${node_image_version}-alpine as node
#
# Development/Build Container
#

FROM node as final

# Get the listen port at image BUILD time
ARG node_image_port=3032

# Set the ENV to:
# - Expose the PORT in docker
# - The application runtimei: used by the HOST:PORT listen function
ENV PORT=${node_image_port}

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


