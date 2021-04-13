FROM node:14.16.0
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install
EXPOSE 3000
COPY . .
CMD yarn start

# to access website on port 3000, make sure to include the port options:
# docker run -p 3000:3000 -t your_image_name