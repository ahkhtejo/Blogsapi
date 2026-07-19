import { Hono } from "hono";

import type { PrismaClient } from "./generated/prisma/client.js";
import withPrisma from "./lib/prisma.js";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
};

const app = new Hono<ContextWithPrisma>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const users = await prisma.user.findMany();

  console.log(`the user is ${users}`);
  return c.json({ users });
});

app.post("/user", withPrisma, async (c) => {
  const body = await c.req.json();

  const { email, name } = body;
  const prisma = c.get("prisma");

  const userUser = await prisma.user.create({
    data: { email: email, name: name },
  });
  c.status(201);

  return c.json(userUser);
});

// get user info by user id
app.get("/users/:id", withPrisma, async (c) => {
  const id = await c.req.param("id");
  const user_id = Number(id);
  const prisma = c.get("prisma");
  // check the db do we have this id

  console.log(` user id is ${user_id}`);

  const UserData = await prisma.user.findUnique({
    where: {
      id: Number(user_id),
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  console.log(` that user data is ${UserData}`);
  if (!UserData) {
    c.status(400);
    return c.json({ data: " no user was founed in db with id" });
  }

  // return the user

  c.status(200);
  return c.json({ data: UserData });
});

app.post("/", async (c) => {
  const body = await c.req.json();
  const { id, commentId } = body;
  console.log(`id is ${id}`);
  return c.json({ id: id, commentId });
});

export default app;
