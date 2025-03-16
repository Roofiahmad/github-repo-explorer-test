import { render } from "@testing-library/react";
import StoreProvider from "app/redux/StoreProvider";
import React from "react";

const renderWithRedux = (
  ui: React.ReactElement,
  options?: React.ComponentProps<any>
) => render(ui, { wrapper: StoreProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithRedux as render };
