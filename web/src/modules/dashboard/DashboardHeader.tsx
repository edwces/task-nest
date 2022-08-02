import {
  Avatar,
  Burger,
  Group,
  Header,
  MediaQuery,
  UnstyledButton,
} from "@mantine/core";
import { useRouter } from "next/router";
import { BrandLogo } from "../../common/components/BrandLogo";
import { useLogoutMutation } from "../auth/api/useLogoutMutation";
import { UserMenu } from "../user/components/UserMenu";
import { ColorSchemeSwitch } from "./ColorSchemeSwitch";

interface DashboardHeaderProps {
  isBurgerOpen: boolean;
  onBurgerClick: () => void;
}

export function DashboardHeader({
  isBurgerOpen,
  onBurgerClick,
}: DashboardHeaderProps) {
  const logout = useLogoutMutation();
  const router = useRouter();

  const handleLogout = () =>
    logout.mutate(undefined, { onSuccess: () => router.push("/") });

  return (
    <Header px="xl" height={80}>
      <Group align="center" position="apart" sx={{ height: "100%" }}>
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger opened={isBurgerOpen} onClick={onBurgerClick} size="sm" />
          </MediaQuery>
          <BrandLogo />
        </Group>
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
