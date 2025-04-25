import { SortOption } from "../components/SortPanel";
import { SortingState } from "@tanstack/react-table"; // Import SortingState from the appropriate library
export function convertToTanStackSorting(
  sortOptions: SortOption[]
): SortingState {
  return sortOptions.map((option) => ({
    id: option.field,
    desc: option.direction === "desc",
  }));
}

export function getAvailableFields(
  sortOptions: SortOption[],
  allFields: { value: string; label: string }[]
) {
  return allFields.filter(
    (field) => !sortOptions.some((option) => option.field === field.value)
  );
}
