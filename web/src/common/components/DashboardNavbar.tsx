import { Navbar, Text } from "@mantine/core";
import { TagLinksList } from "../../modules/navigation/components/TagLinksList";
import { useTags } from "../../modules/navigation/hooks/useTags";

export function DashboardNavbar() {
  const { data } = useTags();

  return (
    <Navbar p={20} width={{ base: 250 }}>
      <Text weight={700} mb={20}>
        Tags:
      </Text>
      {data && <TagLinksList data={data} />}
    </Navbar>
  );
}
