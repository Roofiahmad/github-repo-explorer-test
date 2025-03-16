// import { http, HttpResponse } from "msw";
import { rest } from "msw";
import { repoSearchResponse, searcUserResponse } from "./response";

export const handlers = [
  rest.get("https://api.github.com/search/users", (_req, res, ctx) => {
    return res(ctx.json(searcUserResponse));
  }),
  rest.get("https://api.github.com/search/repositories", (_req, res, ctx) => {
    return res(ctx.json(repoSearchResponse));
  }),

  // this below used on msw ver 2
  // http.get("https://api.github.com/search/users", async () => {
  //   // await delay(100);
  //   return HttpResponse.json(searcUserResponse);
  // }),
  // http.get("https://api.github.com/search/repositories", async () => {
  //   // await delay(100);
  //   return HttpResponse.json(repoSearchResponse);
  // }),
];
