import { Hono } from "hono";

const book = new Hono();

book.get("/", (c) => c.text("List Books"));

book.get("/data", (c) => c.json({ data: " hello team this is my router" }));
export default book;
