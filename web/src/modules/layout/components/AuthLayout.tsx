import { AppShell, Center, Container } from "@mantine/core";
import { ReactNode } from "react";
import { DefaultFooter } from "../../../common/components/DefaultFooter";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AppShell
      fixed
      footer={<DefaultFooter />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Center sx={{ height: "100%" }}>{children}</Center>
    </AppShell>
  );
}
