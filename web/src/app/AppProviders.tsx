import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { setCookie } from "cookies-next";
import { ReactNode, useState } from "react";
import { QueryClientProvider } from "react-query";
import { Modal } from "../common/types/modal.enum";
import { queryClient } from "../config/queryClient";
import { SessionProvider } from "../modules/auth/components/SessionProvider";
import { EditTodoModal } from "../modules/todo/components/EditTodoModal";
import { AppErrorBoundary } from "./AppErrorBoundary";

interface AppProvidersProps {
  children: ReactNode;
  color: ColorScheme;
}

export function AppProviders({ children, color }: AppProvidersProps) {
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
          <ModalsProvider modals={{ [Modal.EDIT_TODO]: EditTodoModal }}>
            <AppErrorBoundary>
              <SessionProvider>{children}</SessionProvider>
            </AppErrorBoundary>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}
