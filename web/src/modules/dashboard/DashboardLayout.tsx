import { AppShell, Container } from "@mantine/core";
import { ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavbar } from "./DashboardNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AppShell
      fixed
      header={<DashboardHeader />}
      navbar={<DashboardNavbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container fluid px={40} pt={5}>
        {children}
      </Container>
    </AppShell>
  );
}
