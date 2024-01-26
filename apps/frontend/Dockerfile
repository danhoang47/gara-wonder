FROM node:alpine as build1
WORKDIR .
COPY . . 
RUN npm install
RUN npm run build 

FROM nginx:1.17-alpine as production-stage
COPY --from=build1 ./dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf  
COPY ./nginx-config.conf etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]