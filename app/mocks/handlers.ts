import { http, delay, HttpResponse } from "msw";
import { repoSearchResponse, searcUserResponse } from "./response";

export const handlers = [
  http.get("https://api.github.com/search/users", async () => {
    // await delay(100);
    return HttpResponse.json(searcUserResponse);
  }),
  http.get("https://api.github.com/search/repositories", async () => {
    // await delay(100);
    return HttpResponse.json(repoSearchResponse);
  }),
];
