import { Group, Box, createStyles, Text, Anchor } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ReactNode } from "react";

interface NavigationItemProps {
  link?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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
        ? theme.colors.dark[6]
        : theme.colors.gray[0]
      : "transparent",
    borderRadius: theme.radius.sm,
    padding: 10,

    transitionDuration: "300ms",
    transitionTimingFunction: "ease-in-out",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
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
  leftIcon,
  rightIcon,
  link = "#",
  children,
  label = "",
  isActive = false,
}: NavigationItemProps) {
  const { classes } = useStyles({ isActive });

  return (
    <Box component={NextLink} href={link} className={classes.wrapper}>
      {children || (
        <Group position="apart" className={classes.main}>
          <Group>
            {leftIcon ? leftIcon : null}
            <Text weight={600}>{label}</Text>
          </Group>
          {rightIcon ? rightIcon : null}
        </Group>
      )}
    </Box>
  );
}
