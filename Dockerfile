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

EXPOSE 3000
RUN npm run build
CMD NODE_ENV=production npm run start