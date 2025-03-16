import { screen, within } from "@testing-library/react";
import { render } from "app/test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "./mocks/server";
import {
  errorRepoSearch,
  repoSearchResponse,
  searcUserResponse,
} from "./mocks/response";
import Page from "./page";
import AlertDialog from "./components/AlertDialog";

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
  expect(accordionItem).toHaveLength(searcUserResponse.items.length);
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
  expect(accordionItem).toHaveLength(repoSearchResponse.items.length);
});

it("show error popup on click private username", async () => {
  server.resetHandlers(
    rest.get("https://api.github.com/search/repositories", (_req, res, ctx) => {
      return res(ctx.status(422), ctx.json(errorRepoSearch));
    })
  );

  const userEvn = userEvent.setup();
  render(
    <>
      <AlertDialog />
      <Page />
    </>
  );
  const buttonEl = await screen.findByRole("button", { name: /search/i });
  const inputEl = await screen.findByPlaceholderText(/enter username/i);

  userEvn.clear(inputEl);
  await userEvn.type(inputEl, "roofi");
  userEvn.click(buttonEl);

  const accordionExpandIcon = await screen.findAllByTestId("ExpandMoreIcon");
  await userEvent.click(accordionExpandIcon[0]);

  const modal = within(await screen.findByRole("dialog"));
  expect(modal.getByText(/error/i)).toBeInTheDocument;
});
