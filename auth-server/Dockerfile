# pull the Node.js Docker image
FROM node:alpine

# Create working directory
WORKDIR /usr/src/app

# Copy the package.json files from local machine to the workdir in container
COPY ./auth-server/package*.json ./

# Copy entire packages folder with shared packages
COPY ./packages/ ../packages

# Running npm install in server-framework module
WORKDIR /usr/src/packages/server-framework
RUN npm install


# Running npm install in for the app
WORKDIR /usr/src/app
RUN npm install

# Copy files from auth-server
COPY ./auth-server .

# Expose running port
EXPOSE 3000

# the command that starts our app
CMD ["node", "index.js"]