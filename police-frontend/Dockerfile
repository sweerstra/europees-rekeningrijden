# Stage 1 - the build process
FROM node:7.10 as build-deps

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

RUN npm install --silent
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine

# Change the default Nginx config for React Router
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
