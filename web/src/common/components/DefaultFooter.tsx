import { ActionIcon, Footer, Group, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { GithubIcon } from "./GithubIcon";

export function DefaultFooter() {
  return (
    <Footer height={50} px={10}>
      <Group sx={{ height: "100%" }}>
        <ActionIcon
          component={NextLink}
          href="https://github.com/edwces/task-nest"
        >
          <GithubIcon size={20} />
        </ActionIcon>
        <Text color="dimmed">Created by edwces</Text>
      </Group>
    </Footer>
  );
}
