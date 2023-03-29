import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
import cookie from "@fastify/cookie"

const app = Fastify();

app.register(cors, {
  origin: process.env.ORIGIN,
  methods: "GET,PUT,POST,DELETE,OPTIONS,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  preflightContinue: true
});
app.register(appRoutes);
app.register(cookie)

const port = process.env.PORT

app.listen({
  host: '0.0.0.0',
  port: Number(port)
}).then(() => console.log(`Server is running at ${port}...`));