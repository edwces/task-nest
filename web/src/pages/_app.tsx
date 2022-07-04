import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../config/queryClient";
import { SessionProvider } from "../modules/auth/components/SessionProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
