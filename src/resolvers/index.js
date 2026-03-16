import Resolver from "@forge/resolver";
import { storage } from "@forge/api";

const resolver = new Resolver();

resolver.define("getText", (req) => {
  console.log(req);
  return "Hello, world!";
});

resolver.define("create", async (req) => {
  console.log(req.payload);
  return "created";
});

export const handler = resolver.getDefinitions();
