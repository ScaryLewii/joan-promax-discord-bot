# Intermediate docker image to build the bundle in and install dependencies
FROM node:alpine as build

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json over in the intermedate "build" image
COPY ./package.json ./
COPY ./package-lock.json ./

# Install the dependencies
# Clean install because we want to install the exact versions
RUN npm ci --omit=dev

# Copy the source code into the build image
COPY . .

EXPOSE 8080

# Start the application
CMD [ "node", "index.js"]