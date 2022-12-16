# stage 0: building frontend assets
FROM node:12.16.3-alpine as build

WORKDIR /app
COPY package*.json 
RUN nmp install
COPY ..
RUN npm run build

# stage 1: serveing frontend assets
FROM fholzer/nginx-brotli:v1.12.2
WORKDIR /ect/nginx
ADD nginx.conf /ect/nginx/ngnx.conf

COPY --from=build //app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "deamon off;"]
