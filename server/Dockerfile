# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY ./server/package*.json ./
COPY ../.env.* ../

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY ./server .

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 3000

ENV NODE_ENV='production'

# the command that starts our app
CMD ["node", "index.js"]