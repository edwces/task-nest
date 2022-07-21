import type { AppProps } from "next/app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../config/queryClient";
import { SessionProvider } from "../modules/auth/components/SessionProvider";
import { ModalsProvider } from "@mantine/modals";
import { Modal } from "../common/types/modal.enum";
import { NextPageWithLayout } from "../common/types/next-page-with-layout.interface";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getCookie, setCookie } from "cookies-next";
import { CustomErrorBoundary } from "../common/components/CustomErrorBoundary";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  color: ColorScheme;
};

function MyApp({ Component, pageProps, color }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(color);

  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newColorScheme);
    setCookie("colorscheme", newColorScheme, { maxAge: 1000 * 60 * 24 });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            colorScheme,
            fontFamily: "Open Sans",
            primaryColor: "violet",
            headings: { fontFamily: "Montserrat" },
          }}
        >
          <CustomErrorBoundary>
            <SessionProvider>
              {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
          </CustomErrorBoundary>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

// Runs server-side only on initial Request, then client side
MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return { color: getCookie("colorscheme", ctx) || "light" };
};

export default MyApp;
