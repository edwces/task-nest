import { Divider, Navbar, ScrollArea, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { Article, BoxMultiple, CalendarTime } from "tabler-icons-react";
import { useTags } from "../tag/api/useTags";
import { NavigationItem } from "./NavigationItem";
import { TagLinksList } from "./TagLinksList";

interface DashboardNavbarProps {
  isHidden: boolean;
}

export function DashboardNavbar({ isHidden }: DashboardNavbarProps) {
  const router = useRouter();
  const { data } = useTags();

  const isRootActive = router.isReady && router.pathname === "/";
  const isTodayActive = router.isReady && router.pathname === "/today";
  const isWeekActive = router.isReady && router.pathname === "/week";

  return (
    <Navbar
      p={10}
      hidden={isHidden}
      hiddenBreakpoint="sm"
      width={{ sm: 250, lg: 300 }}
    >
      <Navbar.Section>
        <Stack spacing={5}>
          <NavigationItem
            icon={<BoxMultiple size={20} />}
            link="/"
            label="All"
            isActive={isRootActive}
          />
          <NavigationItem
            icon={<CalendarTime size={20} />}
            link="/today"
            label="Today"
            isActive={isTodayActive}
          />
          <NavigationItem
            icon={<Article size={20} />}
            link="/week"
            label="Weekly"
            isActive={isWeekActive}
          />
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
