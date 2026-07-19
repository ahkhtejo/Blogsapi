import { Hono } from "hono";
import { GetUsers } from "../services/UserService";

const user = new Hono();

user.get("/users", async (c) => {
  const users = await GetUsers();
  return c.json({ users });
});

export default user;
