import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../config/queryClient";
import { SessionProvider } from "../modules/auth/components/SessionProvider";
import { ModalsProvider } from "@mantine/modals";
import { AddTodoModal } from "../modules/todo/components/AddTodoModal";
import { Modal } from "../common/types/modal.enum";
import { NextPageWithLayout } from "../common/types/next-page-with-layout.interface";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS>
        <ModalsProvider modals={{ [Modal.ADD_TODO]: AddTodoModal }}>
          <SessionProvider>
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
