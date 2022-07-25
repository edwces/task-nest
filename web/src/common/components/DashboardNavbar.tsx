import { Divider, Navbar, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { Activity, BoxMultiple } from "tabler-icons-react";
import { useTags } from "../../modules/navigation/api/useTags";
import { NavigationItem } from "../../modules/navigation/components/NavigationItem";
import { NavigationItemsList } from "../../modules/navigation/components/NavigationItemsList";

export function DashboardNavbar() {
  const router = useRouter();
  const { data } = useTags();

  const isRootSelected = router.isReady ? router.pathname === "/" : false;

  return (
    <Navbar p={20} width={{ base: 250 }}>
      <Navbar.Section>
        <Stack spacing={5}>
          <NavigationItem
            icon={<BoxMultiple size={20} />}
            link="/"
            label="All"
            isActive={isRootSelected}
          />
          <NavigationItem
            icon={<Activity size={20} />}
            link="/activity"
            label="Activity"
          />
        </Stack>
      </Navbar.Section>
      <Divider my={20} />
      <Navbar.Section grow>
        {data && router.isReady && (
          <NavigationItemsList
            data={data}
            activeItem={router.query.slug as string}
          />
        )}
      </Navbar.Section>
    </Navbar>
  );
}
