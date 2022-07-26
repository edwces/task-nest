import { Divider, Navbar } from "@mantine/core";
import { useRouter } from "next/router";
import { BoxMultiple } from "tabler-icons-react";
import { useTags } from "../tag/api/useTags";
import { NavigationItem } from "./NavigationItem";
import { TagLinksList } from "./TagLinksList";

export function DashboardNavbar() {
  const router = useRouter();
  const { data } = useTags();

  const isRootActive = router.isReady && router.pathname === "/";

  return (
    <Navbar p={20} width={{ base: 250 }}>
      <Navbar.Section>
        <NavigationItem
          icon={<BoxMultiple size={20} />}
          link="/"
          label="All"
          isActive={isRootActive}
        />
      </Navbar.Section>
      <Divider my={20} />
      <Navbar.Section grow>
        {data && router.isReady && (
          <TagLinksList tags={data} activeItem={router.query.slug as string} />
        )}
      </Navbar.Section>
    </Navbar>
  );
}
