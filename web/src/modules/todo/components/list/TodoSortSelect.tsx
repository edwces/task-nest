import { Select } from "@mantine/core";
import { useState } from "react";
import { ArrowsSort } from "tabler-icons-react";
import { Sorting } from "../../enums/sorting.enum";

const sortOptions = [
  { value: "NEWEST", label: "Latest" },
  { value: "OLDEST", label: "Oldest" },
];

interface TodoSortSelectProps {
  initialValue?: Sorting;
  onSortApply?: (value: Sorting) => void;
}

export function TodoSortSelect({
  onSortApply = () => {},
  initialValue = Sorting.NEWEST,
}: TodoSortSelectProps) {
  const [sort, setSort] = useState(initialValue);

  const onSortChange = (value: Sorting) => {
    setSort(value);
    onSortApply(sort);
  };

  return (
    <Select
      placeholder="Sort by"
      value={sort}
      onChange={onSortChange}
      data={sortOptions}
      icon={<ArrowsSort />}
    />
  );
}
