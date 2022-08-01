import { AppShell, Container } from "@mantine/core";
import { ReactNode, useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavbar } from "./DashboardNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isBurgerOpen, setBurgerOpen] = useState(false);

  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="sm"
      header={
        <DashboardHeader
          isBurgerOpen={isBurgerOpen}
          onBurgerClick={() => setBurgerOpen(!isBurgerOpen)}
        />
      }
      navbar={<DashboardNavbar isHidden={!isBurgerOpen} />}
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
