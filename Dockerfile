FROM node:18.17.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN echo "Build completed"
RUN ls -la /usr/src/app
RUN ls -la /usr/src/app/dist || echo "dist directory not found"
RUN cat /usr/src/app/dist/app.js || echo "app.js not found"

EXPOSE 3000

CMD [ "node", "dist/src/app.js" ]