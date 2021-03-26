FROM node:14.16.0
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install
EXPOSE 3000
COPY . .
CMD yarn start

# docker run -p 3000:3000 -t image_name