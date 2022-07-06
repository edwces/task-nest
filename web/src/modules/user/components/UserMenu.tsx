import { Menu } from "@mantine/core";
import { JSXElementConstructor, ReactElement } from "react";

interface UserMenuProps {
  onLogout?: () => void;
  onSettings?: () => void;
  control?: ReactElement<any, string | JSXElementConstructor<any>>;
}

export function UserMenu({ onLogout, onSettings, control }: UserMenuProps) {
  return (
    <Menu control={control}>
      <Menu.Label>Account</Menu.Label>
      <Menu.Item onClick={onLogout}>Logout</Menu.Item>
      <Menu.Item onClick={onSettings}>Settings</Menu.Item>
    </Menu>
  );
}
