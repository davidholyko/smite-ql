FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

# If you are building your code for production
RUN npm ci

# Bundle app source
COPY . .

RUN npm run build
CMD npx serve -s build