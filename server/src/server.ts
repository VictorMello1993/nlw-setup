import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

const port = process.env.PORT

app.listen({
  port: Number(port) || 3333,
  host: '0.0.0.0'
}).then(() => console.log(`Server is running at ${port}...`));