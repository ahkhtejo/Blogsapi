import { Hono } from "hono";

import type { PrismaClient } from "../generated/prisma/client.js";
import withPrisma from "../lib/prisma.js";
import { AddUser, GetUserByID, GetUsers } from "../services/UserService.js";

import book from "../Routes/temp.js";
import UserRoutes from "../Routes/UserRoutes.js";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
};

const app = new Hono<ContextWithPrisma>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/user", async (c) => {
  const body = await c.req.json();

  const { email, name } = body;

  const userUser = await AddUser(email, name);
  c.status(201);

  return c.json(userUser);
});

// get user info by user id
app.get("/users/:id", async (c) => {
  const id = await c.req.param("id");
  const user_id = Number(id);

  const UserData = await GetUserByID(user_id);

  console.log(` that user data is ${UserData}`);
  if (!UserData) {
    c.status(400);
    return c.json({ data: " no user was founed in db with id" });
  }

  c.status(200);
  return c.json({ data: UserData });
});

app.route("/book", book);
app.route("/api", UserRoutes);

export default app;
