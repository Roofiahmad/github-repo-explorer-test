import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Loading from "./components/Loading";
import StoreProvider from "./redux/StoreProvider";
import AlertDialog from "./components/AlertDialog";

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
            <AlertDialog />
            {children}
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
