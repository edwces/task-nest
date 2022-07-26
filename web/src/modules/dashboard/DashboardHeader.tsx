import { Avatar, Group, Header, Title, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../auth/api/useLogoutMutation";
import { UserMenu } from "../user/components/UserMenu";
import { ColorSchemeSwitch } from "./ColorSchemeSwitch";

export function DashboardHeader() {
  const logout = useLogoutMutation();
  const router = useRouter();

  const handleLogout = () =>
    logout.mutate(undefined, { onSuccess: () => router.push("/") });

  return (
    <Header px="xl" height={80}>
      <Group align="center" position="apart" sx={{ height: "100%" }}>
        <Title>Logo</Title>
        <Group spacing={20}>
          <ColorSchemeSwitch />
          <UserMenu
            control={
              <UnstyledButton sx={{ borderRadius: 100 }}>
                <Avatar radius="xl" size="md" />
              </UnstyledButton>
            }
            onLogout={handleLogout}
          />
        </Group>
      </Group>
    </Header>
  );
}
