FROM node:16

WORKDIR /usr/app

#Instalando as dependências
COPY package*.json ./
RUN npm install

#Copiando outros arquivos
COPY . .

RUN npm run start
EXPOSE 3333
CMD ["npm", "run", "dev"]