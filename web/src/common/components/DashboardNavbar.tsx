import { Navbar, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { TagLinksList } from "../../modules/navigation/components/TagLinksList";
import { useTags } from "../../modules/navigation/hooks/useTags";

export function DashboardNavbar() {
  const router = useRouter();
  const { data } = useTags();

  return (
    <Navbar p={20} width={{ base: 250 }}>
      <Text weight={700} mb={20}>
        Tags:
      </Text>
      {data && router.isReady && (
        <TagLinksList data={data} selectedLabel={router.query.slug as string} />
      )}
    </Navbar>
  );
}
