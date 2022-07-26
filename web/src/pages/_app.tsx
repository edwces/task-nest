import type { AppProps } from "next/app";
import { ColorScheme } from "@mantine/core";
import { NextPageWithLayout } from "../common/interfaces/next-page-with-layout.interface";
import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppProviders } from "../app/AppProviders";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  color: ColorScheme;
};

function MyApp({ Component, pageProps, color }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppProviders color={color}>
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  );
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return { color: getCookie("colorscheme", ctx) || "light" };
};

export default MyApp;
