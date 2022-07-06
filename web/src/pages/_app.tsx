import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../config/queryClient";
import { SessionProvider } from "../modules/auth/components/SessionProvider";
import { ModalsProvider } from "@mantine/modals";
import { AddTodoModal } from "../modules/todo/components/AddTodoModal";
import { Modal } from "../common/types/modal.enum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withNormalizeCSS>
        <ModalsProvider modals={{ [Modal.ADD_TODO]: AddTodoModal }}>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
