import { AppShell, Center } from "@mantine/core";
import { ReactNode } from "react";
import { BrandLogo } from "../../../common/components/BrandLogo";
import { DefaultFooter } from "../../../common/components/DefaultFooter";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AppShell
      fixed
      padding={35}
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
      <BrandLogo />
      <Center sx={{ height: "100%" }}>{children}</Center>
    </AppShell>
  );
}
