ARG node_image_version=16

# Use Alpine Linux which has a smaller footprint
FROM node:${node_image_version}-alpine as node
#
# Development/Build Container
#

FROM node as final

ARG node_image_port=3032

WORKDIR /app

# Install node dependencies
COPY package.json package-lock.json ./
RUN npm install

# Compile application
COPY . .

# Open desired port
EXPOSE ${node_image_port}

# Dev entry point
ENTRYPOINT ["npm", "run", "start"]


