import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { DashboardHeader } from "../../../common/components/DashboardHeader";
import { AuthGate } from "../../auth/components/AuthGate";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGate redirectUrl="/account/sign-in">
      <AppShell header={<DashboardHeader />}>{children}</AppShell>;
    </AuthGate>
  );
}
