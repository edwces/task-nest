import { Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";

export const orderOptions = [
  { value: "created-by:desc", label: "latest" },
  { value: "created-by:asc", label: "oldest" },
] as const;

interface TodoFilters {
  order: typeof orderOptions[number]["value"];
}

interface TodoFilterBarProps {
  initialValue?: TodoFilters;
  onChange?: (values: TodoFilters) => void;
}

export function TodoFilterBar({
  onChange = () => {},
  initialValue = { order: "created-by:asc" },
}: TodoFilterBarProps) {
  const [filters, setFilters] = useState<TodoFilters>(initialValue);

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  return (
    <Group>
      <Select
        placeholder="Sort by"
        value={filters.order}
        onChange={(value: TodoFilters["order"]) =>
          setFilters({ ...filters, order: value })
        }
        data={orderOptions as any}
      />
    </Group>
  );
}
