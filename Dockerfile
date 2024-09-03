# Stage 1: Build
FROM node:14-alpine as build
WORKDIR /quiz-client
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.20.0-alpine
COPY --from=build /quiz-client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]