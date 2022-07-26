import { Group, Box, createStyles, Text, Anchor } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ReactNode } from "react";

interface NavigationItemProps {
  link?: string;
  icon?: ReactNode;
  children?: ReactNode;
  label?: string;
  isActive?: boolean;
}

interface NavigationItemStylesParams {
  isActive: boolean;
}

const useStyles = createStyles((theme, params: NavigationItemStylesParams) => ({
  main: {
    backgroundColor: params.isActive
      ? theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2]
      : "transparent",
    borderRadius: theme.radius.sm,
    padding: 10,

    transitionDuration: "300ms",
    transitionTimingFunction: "ease-in-out",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2],
    },
  },
  wrapper: {
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
  },
}));

export function NavigationItem({
  icon,
  link = "#",
  children,
  label = "",
  isActive = false,
}: NavigationItemProps) {
  const { classes } = useStyles({ isActive });

  return (
    <Box component={NextLink} href={link} className={classes.wrapper}>
      {children || (
        <Group className={classes.main}>
          {icon ? icon : null}
          <Text weight={600}>{label}</Text>
        </Group>
      )}
    </Box>
  );
}
