import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../config/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
