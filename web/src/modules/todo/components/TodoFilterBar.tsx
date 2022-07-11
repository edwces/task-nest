import { Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";

export const sortOptions = [
  { value: "createdAt:desc", label: "latest" },
  { value: "createdAt:asc", label: "oldest" },
] as const;

interface TodoFilters {
  sort: typeof sortOptions[number]["value"];
}

interface TodoFilterBarProps {
  initialValue?: TodoFilters;
  onFiltersApply?: (values: TodoFilters) => void;
}

export function TodoFilterBar({
  onFiltersApply = () => {},
  initialValue = { sort: "createdAt:asc" },
}: TodoFilterBarProps) {
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
      />
    </Group>
  );
}
