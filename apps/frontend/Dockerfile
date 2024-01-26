from node:alpine as build1
workdir .
copy . . 
run npm install
run npm run build 

from nginx:1.17-alpine as production-stage
copy --from=build1 ./dist /usr/share/nginx/html
run rm /etc/nginx/conf.d/default.conf  
copy ./nginx-config.conf etc/nginx/conf.d
expose 80
cmd ["nginx", "-g", "daemon off;"]