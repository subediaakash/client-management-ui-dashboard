import { Button } from "./ui/button";
import {
  Plus,
  X,
  GripVertical,
  SortAsc,
  SortDesc,
  Filter,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export interface SortOption {
  id: string;
  field: string;
  direction: "asc" | "desc";
}

interface SortPanelProps {
  sortOptions: SortOption[];
  onSortChange: (options: SortOption[]) => void;
  availableFields: { value: string; label: string }[];
}

export function SortPanel({
  sortOptions,
  onSortChange,
  availableFields,
}: SortPanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleAddSort = (field: string) => {
    onSortChange([
      ...sortOptions,
      { id: `${field}-${Date.now()}`, field, direction: "asc" },
    ]);
  };

  const handleRemoveSort = (id: string) => {
    onSortChange(sortOptions.filter((option) => option.id !== id));
  };

  const handleDirectionToggle = (id: string) => {
    onSortChange(
      sortOptions.map((option) =>
        option.id === id
          ? {
              ...option,
              direction: option.direction === "asc" ? "desc" : "asc",
            }
          : option
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sortOptions.findIndex((item) => item.id === active.id);
      const newIndex = sortOptions.findIndex((item) => item.id === over?.id);
      onSortChange(arrayMove(sortOptions, oldIndex, newIndex));
    }
  };

  const activeSortCount = sortOptions.length;

  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-indigo-600" />
          <h3 className="font-medium text-gray-800">Sort Results</h3>
          {activeSortCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
              {activeSortCount}
            </span>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={availableFields.length === 0}
              className="w-full sm:w-auto border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Sort Criteria
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[200px] max-w-[280px] border-gray-200 shadow-md">
            <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
              Available Fields
            </div>
            <DropdownMenuSeparator />
            {availableFields.length > 0 ? (
              availableFields.map((field) => (
                <DropdownMenuItem
                  key={field.value}
                  onSelect={() => handleAddSort(field.value)}
                  className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <div className="flex items-center">
                    <SortAsc className="mr-2 h-4 w-4 text-gray-400" />
                    {field.label}
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="px-2 py-3 text-sm text-gray-500 text-center">
                All fields already added
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={sortOptions}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <SortItem
                key={option.id}
                option={option}
                onDirectionToggle={handleDirectionToggle}
                onRemove={handleRemoveSort}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {sortOptions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
          <Filter className="h-10 w-10 mb-2 text-gray-300" />
          <p className="text-sm font-medium text-center">
            No sort criteria selected
          </p>
          <p className="text-xs mt-1 text-center px-2">
            Add criteria to sort your client results
          </p>
        </div>
      )}

      {sortOptions.length > 0 && (
        <div className="flex justify-center sm:justify-end mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSortChange([])}
            className="text-gray-600 hover:text-red-600 hover:border-red-200 group"
          >
            <Trash2 className="mr-1 h-4 w-4 group-hover:text-red-500" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}

function SortItem({
  option,
  onDirectionToggle,
  onRemove,
}: {
  option: SortOption;
  onDirectionToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  const fieldLabels: Record<string, string> = {
    name: "Client Name",
    type: "Client Type",
    email: "Email",
    status: "Status",
    createdAt: "Created At",
    updatedAt: "Updated At",
    id: "Client ID",
  };

  const fieldIcons: Record<string, React.ReactNode> = {
    name: <Filter className="h-3 w-3 text-indigo-500" />,
    type: <Filter className="h-3 w-3 text-blue-500" />,
    email: <Filter className="h-3 w-3 text-green-500" />,
    status: <Filter className="h-3 w-3 text-yellow-500" />,
    createdAt: <Filter className="h-3 w-3 text-purple-500" />,
    updatedAt: <Filter className="h-3 w-3 text-pink-500" />,
    id: <Filter className="h-3 w-3 text-gray-500" />,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-wrap sm:flex-nowrap items-center justify-between bg-white p-2 sm:p-3 rounded-md border ${
        option.direction === "asc" ? "border-indigo-200" : "border-blue-200"
      } ${isDragging ? "shadow-md" : "shadow-sm"}`}
    >
      <div className="flex items-center w-full sm:w-auto sm:space-x-2">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 focus-visible:outline-none cursor-grab active:cursor-grabbing p-1"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-1 flex-grow sm:flex-grow-0 truncate">
          {fieldIcons[option.field] || (
            <Filter className="h-3 w-3 text-gray-500 flex-shrink-0" />
          )}
          <span className="text-sm font-medium text-gray-700 truncate">
            {fieldLabels[option.field] || option.field}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2">
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            option.direction === "asc"
              ? "bg-indigo-50 text-indigo-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-5 px-1 hover:bg-transparent"
            onClick={() => onDirectionToggle(option.id)}
          >
            {option.direction === "asc" ? (
              <div className="flex items-center">
                <SortAsc className="mr-1 h-3 w-3" />
                <span className="text-xs">Ascending</span>
              </div>
            ) : (
              <div className="flex items-center">
                <SortDesc className="mr-1 h-3 w-3" />
                <span className="text-xs">Descending</span>
              </div>
            )}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full ml-2"
          onClick={() => onRemove(option.id)}
          aria-label="Remove sort criteria"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
