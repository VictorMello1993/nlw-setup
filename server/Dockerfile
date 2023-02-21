FROM node:16

WORKDIR /usr/app

#Instalando as dependências
COPY package*.json ./
RUN npm install
RUN npx prisma generate

#Copiando outros arquivos
COPY . .

EXPOSE 3333
CMD ["npm", "run", "dev"]