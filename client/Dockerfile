FROM node:12-alpine as front

WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build


FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /usr/share/nginx/html/*
COPY --from=front /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]