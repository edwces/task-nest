import { Avatar, Header } from "@mantine/core";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../../modules/auth/hooks/useLogoutMutation";
import { UserMenu } from "../../modules/user/components/UserMenu";

export function DashboardHeader() {
  const logout = useLogoutMutation();
  const router = useRouter();

  return (
    <Header p="md" height={60}>
      <UserMenu
        control={<Avatar />}
        onLogout={() =>
          logout.mutate(undefined, { onSuccess: () => router.push("/") })
        }
      />
    </Header>
  );
}
