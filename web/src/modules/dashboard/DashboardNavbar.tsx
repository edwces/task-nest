import { Divider, Navbar, ScrollArea, Stack, ThemeIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { Article, BoxMultiple, CalendarTime } from "tabler-icons-react";
import { useTags } from "../tag/api/useTags";
import { NavigationItem } from "./NavigationItem";
import { TagLinksList } from "./TagLinksList";

interface DashboardNavbarProps {
  isHidden: boolean;
}

const navigationData = [
  {
    icon: (
      <ThemeIcon variant="light">
        <BoxMultiple size={18} />
      </ThemeIcon>
    ),
    link: "/",
    label: "All",
  },
  {
    icon: (
      <ThemeIcon variant="light" color="green">
        <CalendarTime size={18} />
      </ThemeIcon>
    ),
    link: "/today",
    label: "Today",
  },
  {
    icon: (
      <ThemeIcon variant="light" color="blue">
        <Article size={18} />
      </ThemeIcon>
    ),
    link: "/week",
    label: "Week",
  },
];

export function DashboardNavbar({ isHidden }: DashboardNavbarProps) {
  const router = useRouter();
  const { data } = useTags();

  const isActive = (path: string) => router.isReady && router.pathname === path;

  return (
    <Navbar
      p={10}
      hidden={isHidden}
      hiddenBreakpoint="sm"
      width={{ sm: 250, lg: 300 }}
    >
      <Navbar.Section mt={10}>
        <Stack spacing={5}>
          {navigationData.map((item) => (
            <NavigationItem
              key={item.label}
              leftIcon={item.icon}
              link={item.link}
              label={item.label}
              isActive={isActive(item.link)}
            />
          ))}
        </Stack>
      </Navbar.Section>
      <Divider my={20} />
      <Navbar.Section
        component={ScrollArea}
        offsetScrollbars
        scrollbarSize={8}
        mx={-10}
        pl={10}
        grow
      >
        {data && router.isReady && (
          <TagLinksList tags={data} activeItem={router.query.slug as string} />
        )}
      </Navbar.Section>
    </Navbar>
  );
}
