import { Avatar, Header } from "@mantine/core";
import { useLogoutMutation } from "../../modules/auth/hooks/useLogoutMutation";
import { UserMenu } from "../../modules/user/components/UserMenu";

export function DashboardHeader() {
  const logout = useLogoutMutation();

  return (
    <Header p="md" height={60}>
      <UserMenu control={<Avatar />} onLogout={() => logout.mutate()} />
    </Header>
  );
}
