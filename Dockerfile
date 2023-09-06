FROM node:18.17.1-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25.2-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx
CMD ["nginx", "-g", "daemon off;"]