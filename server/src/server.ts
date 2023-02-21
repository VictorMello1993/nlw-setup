import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);

const port = process.env.PORT

app.listen({
  host: '0.0.0.0',
  port: Number(port)
}).then(() => console.log(`Server is running at ${port}...`));