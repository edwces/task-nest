import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { DashboardHeader } from "../../../common/components/DashboardHeader";
import { DashboardNavbar } from "../../../common/components/DashboardNavbar";
import { AuthGate } from "../../auth/components/AuthGate";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGate redirectUrl="/account/sign-in">
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
        {children}
      </AppShell>
    </AuthGate>
  );
}
