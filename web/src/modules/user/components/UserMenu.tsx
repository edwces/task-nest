import { Menu } from "@mantine/core";
import { JSXElementConstructor, ReactElement } from "react";
import { Logout, Settings } from "tabler-icons-react";

interface UserMenuProps {
  onLogout?: () => void;
  onSettings?: () => void;
  control?: ReactElement<any, string | JSXElementConstructor<any>>;
}

export function UserMenu({ onLogout, onSettings, control }: UserMenuProps) {
  return (
    <Menu control={control}>
      <Menu.Label>Account</Menu.Label>
      <Menu.Item onClick={onLogout} icon={<Logout size={14} />}>
        Logout
      </Menu.Item>
      <Menu.Item onClick={onSettings} icon={<Settings size={14} />}>
        Settings
      </Menu.Item>
    </Menu>
  );
}
