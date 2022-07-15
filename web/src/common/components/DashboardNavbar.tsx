import { Button, Navbar, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { TagLinksList } from "../../modules/navigation/components/TagLinksList";
import { useTags } from "../../modules/navigation/hooks/useTags";

export function DashboardNavbar() {
  const router = useRouter();
  const { data } = useTags();

  const isRootSelected = router.isReady ? router.pathname === "/" : false;

  return (
    <Navbar p={20} width={{ base: 250 }}>
      <Navbar.Section mb={30}>
        <Button
          fullWidth
          component={NextLink}
          href="/"
          variant={isRootSelected ? "filled" : "outline"}
        >
          All
        </Button>
      </Navbar.Section>
      <Navbar.Section grow>
        {data && router.isReady && (
          <TagLinksList
            data={data}
            selectedLabel={router.query.slug as string}
          />
        )}
      </Navbar.Section>
    </Navbar>
  );
}
