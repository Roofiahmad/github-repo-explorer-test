import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Loading from "./components/Loading";
import StoreProvider from "./redux/StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <StoreProvider>
            <Loading />
            {children}
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
