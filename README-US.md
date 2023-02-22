# Habit Tracker

![image](https://user-images.githubusercontent.com/35710766/220465689-0a96f593-d422-47b1-bec4-5182d489e2c1.png)

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#stack-and-tools">Stack and tools</a> •
  <a href="#quick-start">Quick start</a> •
  <a href="#application-link">Application link</a> •  
  <a href="#improvements">Improvements</a>
</p>

## Overview
An app which tracks and manages habits that may or may not be fulfilled in your daily life. This app was developed during the event called NLW Setup, promoted by <a href="https://www.rocketseat.com.br/">Rocketseat</a>.

## Stack and tools
- React.js (Front-end)
- Prisma
- Phospor icon
- Fastify (Framework back-end)
- Node.js
- Banco de dados: Postgres
- Docker
- Zod
- Typescript


## Quick start
1.  Clone your repository
```
git clone https://github.com/VictorMello1993/nlw-setup.git
```

2. Install all of your project dependencies 
```
npm install
```

3. Setup database
```
# Creating Postgres Docker Image
docker-compose up -d

# Setting up database
npx prisma generate

# Pushing the migrations to your database
npx prisma db push

# Running the seed
npx prisma db seed
```

4. Run your project
```
npm run dev
```

## Application link:
https://nlw-setup-otbz5y1ll-victormello1993.vercel.app/

Back-end deploy was done in Render and expires in 90 days (free-tier).


## Improvements
* [ ] Auth feature (It's allowed to use Firebase or Auth0)
* [ ] Push/service workers notifications
* [ ] Public profile with summary graph (everybody can access except to edit the habits that were registered and set as complete, just to show the completed habits list, similar to a Github profile)
* [x] Deploy to production
* [x] Customize scroolbar feature on the habits list, when you have many data recorded in that day (tip: create a component that represents a scrollbar and use Radix ScrollArea)


![br](https://user-images.githubusercontent.com/35710766/220492966-9ed5198a-d9a3-40e2-9d23-e977f4abf253.png) [Portuguese](https://github.com/VictorMello1993/nlw-setup/blob/master/README.md) ![us](https://user-images.githubusercontent.com/35710766/220503018-6f583dda-2ffc-4f62-afb2-ce0a982ef781.png) [English](https://github.com/VictorMello1993/nlw-setup/blob/master/README-US.md)



