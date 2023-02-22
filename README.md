# Habit Tracker

![image](https://user-images.githubusercontent.com/35710766/220465689-0a96f593-d422-47b1-bec4-5182d489e2c1.png)

<p align="center">
  <a href="#visão-geral">Visão geral</a> •
  <a href="#tecnologias-e-ferramentas">Tecnologias e ferramentas</a> •
  <a href="#início-rápido">Início rápido</a> •
  <a href="#link-da-publicação">Link da aplicação</a> •  
  <a href="#o-que-melhorar">O que melhorar</a>
</p>

## Visão geral
Aplicativo que monitora e gerencia os hábitos que podem ou não ser cumpridos em seu dia-a-dia. O presente aplicativo foi desenvolvido durante o evento da NLW Setup, promovido pela <a href="https://www.rocketseat.com.br/">Rocketseat</a>.

## Tecnologias e ferramentas
- React.js (Front-end)
- Prisma
- Phospor icon
- Fastify (Framework back-end)
- Node.js
- Banco de dados: Postgres
- Docker
- Zod
- Typescript


## Início rápido

1.  Clone o seu repositório 
```
git clone https://github.com/VictorMello1993/nlw-setup.git
```

2. Instale as dependências do projeto
```
npm install
```

3. Inicialize o banco de dados
```
# Criando uma imagem Docker do Postgres
docker-compose up -d

# Inicializando o Prisma
npx prisma generate

# Rodando as migrations para o banco de dados
npx prisma db push

# Rodando o seed
npx prisma db seed
```

4. Execute o projeto
```
npm run dev
```

## Link da publicação:
https://nlw-setup-otbz5y1ll-victormello1993.vercel.app/

O deploy do back-end foi realizado no Render, e tem a validade de 90 dias (free-tier)



## O que melhorar
* [ ] Incluir a autenticação (Pode utilizar Firebase ou Auth0)
* [ ] Notificações de push / service workers
* [ ] Perfil público com gráfico de resumo (Todo mundo pode acessar exceto alterar os hábitos que foram registrados e setar como completo, apenas mostrar a lista de hábitos completos, semelhante a um perfil do GitHub)
* [x] Deploy em produção (Refatorar o backend para implementar um provider de banco de dados para que a aplicação permita utilizar vários tipos de bancos de dados diferentes. Dica: não é recomendável utilizar SQLite em ambiente de produção!)
* [x] Customizar a barra de rolagem na lista de hábitos, quando se tem muitos hábitos cadastrados naquele dia (dica: criar um componente que represente uma barra de rolagem e utilizar o Radix ScrollArea


![br](https://user-images.githubusercontent.com/35710766/220492966-9ed5198a-d9a3-40e2-9d23-e977f4abf253.png) [Português](https://github.com/VictorMello1993/nlw-setup/edit/master/README.md)


