import { Avatar, Group, Header, Title, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import { useLogoutMutation } from "../../modules/auth/hooks/useLogoutMutation";
import { UserMenu } from "../../modules/user/components/UserMenu";

export function DashboardHeader() {
  const logout = useLogoutMutation();
  const router = useRouter();

  return (
    <Header p="sm" px="xl" height={80}>
      <Group align="center" position="apart">
        <Title>Logo</Title>
        <UserMenu
          control={
            <UnstyledButton sx={{ borderRadius: 100 }}>
              <Avatar radius="xl" size="md" />
            </UnstyledButton>
          }
          onLogout={() =>
            logout.mutate(undefined, { onSuccess: () => router.push("/") })
          }
        />
      </Group>
    </Header>
  );
}
