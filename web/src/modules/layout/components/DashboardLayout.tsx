import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { DashboardHeader } from "../../../common/components/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return <AppShell header={<DashboardHeader />}>{children}</AppShell>;
}
