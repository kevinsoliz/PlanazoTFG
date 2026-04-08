FROM node:20                                                                                                                          
WORKDIR /app                                                      

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG BACKEND_URL
ENV BACKEND_URL=$BCKEND_URL

RUN npm run build

CMD ["npm", "start"]