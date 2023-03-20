import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
import cookie from "@fastify/cookie"

const app = Fastify();

app.register(cors);
app.register(appRoutes);
app.register(cookie)

const port = process.env.PORT

app.listen({
  host: '0.0.0.0',
  port: Number(port)
}).then(() => console.log(`Server is running at ${port}...`));