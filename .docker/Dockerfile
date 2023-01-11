FROM node:latest as build

WORKDIR /app

COPY . ./

# ---
FROM fholzer/nginx-brotli:latest

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080
ENV HOST=0.0.0.0
ENV PORT=8080
