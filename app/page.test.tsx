/**
 * @jest-environment jsdom
 */
import { logDOM, screen } from "@testing-library/react";
import Page from "./page";
import { render } from "app/test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";
import { errorRepoSearch } from "./mocks/response";

it("initial render page component, must have input and button element", () => {
  render(<Page />);
  const buttonEl = screen.findByRole("button", { name: /search/i });
  const inputEl = screen.findByPlaceholderText(/enter username/i);
  expect(buttonEl).toBeInTheDocument;
  expect(inputEl).toBeInTheDocument;
});

it("show error on click search with empty username", async () => {
  const userEvn = userEvent.setup();
  render(<Page />);
  const buttonEl = await screen.findByRole("button", { name: /search/i });
  const inputEl = await screen.findByPlaceholderText(/enter username/i);

  userEvn.clear(inputEl);
  userEvn.click(buttonEl);
  const errorMsgEl = await screen.findByRole("heading", {
    name: /username can't be empty/i,
  });
  expect(errorMsgEl).toBeInTheDocument;
});

it("show search result on username search", async () => {
  const userEvn = userEvent.setup();
  render(<Page />);
  const buttonEl = await screen.findByRole("button", { name: /search/i });
  const inputEl = await screen.findByPlaceholderText(/enter username/i);

  userEvn.clear(inputEl);
  await userEvn.type(inputEl, "Vue");
  userEvn.click(buttonEl);

  const accordionItem = await screen.findAllByTestId("accordion-component");
  expect(accordionItem).toHaveLength(10);
});

it("show project list on expand user accordion", async () => {
  const userEvn = userEvent.setup();
  render(<Page />);
  const buttonEl = await screen.findByRole("button", { name: /search/i });
  const inputEl = await screen.findByPlaceholderText(/enter username/i);

  userEvn.clear(inputEl);
  await userEvn.type(inputEl, "Vue");
  userEvn.click(buttonEl);

  const accordionExpandIcon = await screen.findAllByTestId("ExpandMoreIcon");
  await userEvent.click(accordionExpandIcon[0]);
  const accordionItem = await screen.findAllByTestId("accordion-item");
  expect(accordionItem).toHaveLength(10);
});

// it("show error popup on click private username", async () => {
//   server.resetHandlers(
//     http.post("https://api.github.com/search/repositories", () => {
//       return new HttpResponse(JSON.stringify(errorRepoSearch), {
//         status: 422,
//       });
//     })
//   );

//   const userEvn = userEvent.setup();
//   render(<Page />);
//   const buttonEl = await screen.findByRole("button", { name: /search/i });
//   const inputEl = await screen.findByPlaceholderText(/enter username/i);

//   userEvn.clear(inputEl);
//   await userEvn.type(inputEl, "roofi");
//   userEvn.click(buttonEl);

//   const accordionExpandIcon = await screen.findAllByTestId("ExpandMoreIcon");
//   await userEvent.click(accordionExpandIcon[0]);
// });
