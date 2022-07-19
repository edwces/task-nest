import { Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { ArrowsSort } from "tabler-icons-react";

export const sortOptions = [
  { value: "NEWEST", label: "Latest" },
  { value: "OLDEST", label: "Oldest" },
] as const;

export interface TodoFilters {
  sort: typeof sortOptions[number]["value"];
}

interface TodoFiltersPickerProps {
  initialValue?: TodoFilters;
  onFiltersApply?: (values: TodoFilters) => void;
}

export function TodoFiltersPicker({
  onFiltersApply = () => {},
  initialValue = { sort: "NEWEST" },
}: TodoFiltersPickerProps) {
  const [filters, setFilters] = useState<TodoFilters>(initialValue);

  useEffect(() => {
    onFiltersApply(filters);
  }, [filters]);

  return (
    <Group>
      <Select
        placeholder="Sort by"
        value={filters.sort}
        onChange={(value: TodoFilters["sort"]) =>
          setFilters({ ...filters, sort: value })
        }
        data={sortOptions as any}
        icon={<ArrowsSort />}
      />
    </Group>
  );
}
