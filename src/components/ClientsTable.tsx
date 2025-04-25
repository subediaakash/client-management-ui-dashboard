import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { IClientData } from "../types/client";
import { mockClients } from "../utils/data";
import { useState, useMemo, useEffect } from "react";
import { SortPanel, SortOption } from "../components/SortPanel";
import { Button } from "../components/ui/button";
import {
  Users,
  UserCircle,
  Building2,
  Mail,
  Calendar,
  Clock,
  BadgeCheck,
  BadgeX,
  AlertCircle,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export const columns: ColumnDef<IClientData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center space-x-1 transition-all duration-200 group hover:text-indigo-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-xs text-gray-500 group-hover:text-indigo-500">
            #
          </span>
          <span>Client ID</span>
          {isSorted && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp size={14} className="text-indigo-600 animate-fadeIn" />
              ) : (
                <ArrowDown
                  size={14}
                  className="text-indigo-600 animate-fadeIn"
                />
              )}
            </div>
          )}
        </button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center space-x-2 transition-all duration-200 group hover:text-indigo-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Users
            size={16}
            className="text-gray-500 group-hover:text-indigo-500"
          />
          <span>Client Name</span>
          {isSorted && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp size={14} className="text-indigo-600 animate-fadeIn" />
              ) : (
                <ArrowDown
                  size={14}
                  className="text-indigo-600 animate-fadeIn"
                />
              )}
            </div>
          )}
        </button>
      );
    },
    sortingFn: "text",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="flex items-center">
          {type === "Individual" ? (
            <UserCircle size={20} className="mr-2 text-indigo-500" />
          ) : (
            <Building2 size={20} className="mr-2 text-blue-500" />
          )}
          <span className="font-medium">{row.getValue("name") as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center space-x-2 transition-all duration-200 group hover:text-indigo-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Building2
            size={16}
            className="text-gray-500 group-hover:text-indigo-500"
          />
          <span>Client Type</span>
          {isSorted && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp size={14} className="text-indigo-600 animate-fadeIn" />
              ) : (
                <ArrowDown
                  size={14}
                  className="text-indigo-600 animate-fadeIn"
                />
              )}
            </div>
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              type === "Individual"
                ? "bg-indigo-100 text-indigo-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {type}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center space-x-2 transition-all duration-200 group hover:text-indigo-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Mail
            size={16}
            className="text-gray-500 group-hover:text-indigo-500"
          />
          <span>Email</span>
          {isSorted && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp size={14} className="text-indigo-600 animate-fadeIn" />
              ) : (
                <ArrowDown
                  size={14}
                  className="text-indigo-600 animate-fadeIn"
                />
              )}
            </div>
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="flex items-center text-sm">
          <Mail size={16} className="mr-2 text-gray-400" />
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center space-x-2 transition-all duration-200 group hover:text-indigo-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <BadgeCheck
            size={16}
            className="text-gray-500 group-hover:text-indigo-500"
          />
          <span>Status</span>
          {isSorted && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp size={14} className="text-indigo-600 animate-fadeIn" />
              ) : (
                <ArrowDown
                  size={14}
                  className="text-indigo-600 animate-fadeIn"
                />
              )}
            </div>
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center">
          {status === "Active" ? (
            <span className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <BadgeCheck size={14} className="mr-1" />
              Active
            </span>
          ) : status === "Inactive" ? (
            <span className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <BadgeX size={14} className="mr-1" />
              Inactive
            </span>
          ) : (
            <span className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <AlertCircle size={14} className="mr-1" />
              Pending
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center space-x-2 transition-all duration-200 group hover:text-indigo-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Calendar
            size={16}
            className="text-gray-500 group-hover:text-indigo-500"
          />
          <span>Created At</span>
          {isSorted && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp size={14} className="text-indigo-600 animate-fadeIn" />
              ) : (
                <ArrowDown
                  size={14}
                  className="text-indigo-600 animate-fadeIn"
                />
              )}
            </div>
          )}
        </button>
      );
    },
    sortingFn: "datetime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);

      return (
        <div className="flex items-center text-sm">
          <Calendar size={14} className="mr-2 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center space-x-2 transition-all duration-200 group hover:text-indigo-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Clock
            size={16}
            className="text-gray-500 group-hover:text-indigo-500"
          />
          <span>Last Updated</span>
          {isSorted && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp size={14} className="text-indigo-600 animate-fadeIn" />
              ) : (
                <ArrowDown
                  size={14}
                  className="text-indigo-600 animate-fadeIn"
                />
              )}
            </div>
          )}
        </button>
      );
    },
    sortingFn: "datetime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt") as string);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);

      return (
        <div className="flex items-center text-sm">
          <Clock size={14} className="mr-2 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      );
    },
  },
];

const allSortFields = [
  { value: "id", label: "Client ID" },
  { value: "name", label: "Client Name" },
  { value: "type", label: "Client Type" },
  { value: "email", label: "Email" },
  { value: "status", label: "Status" },
  { value: "createdAt", label: "Created At" },
  { value: "updatedAt", label: "Updated At" },
] as const;

type ClientTypeFilter = "All" | "Individual" | "Company";

export function ClientsTable() {
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [typeFilter, setTypeFilter] = useState<ClientTypeFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRowAnimated, setIsRowAnimated] = useState(false);
  const [prevSortingState, setPrevSortingState] = useState<SortingState>([]);

  const filteredData = useMemo(() => {
    let result = mockClients;

    if (typeFilter !== "All") {
      result = result.filter((client) => client.type === typeFilter);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (client) =>
          client.name.toLowerCase().includes(term) ||
          client.email.toLowerCase().includes(term) ||
          client.id.toString().includes(term)
      );
    }

    return result;
  }, [typeFilter, searchTerm]);

  const sortingState = useMemo<SortingState>(
    () =>
      sortOptions.map((option) => ({
        id: option.field,
        desc: option.direction === "desc",
      })),
    [sortOptions]
  );

  // Effect to trigger animation when sorting state changes
  useEffect(() => {
    const sortingChanged =
      JSON.stringify(prevSortingState) !== JSON.stringify(sortingState);

    if (sortingChanged && sortingState.length > 0) {
      setIsRowAnimated(true);
      const timer = setTimeout(() => {
        setIsRowAnimated(false);
      }, 500); // Animation duration
      return () => clearTimeout(timer);
    }

    setPrevSortingState(sortingState);
  }, [sortingState, prevSortingState]);

  const availableFields = useMemo(
    () =>
      allSortFields.filter(
        (field) => !sortOptions.some((option) => option.field === field.value)
      ),
    [sortOptions]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sortingState,
    },
  });

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0.7;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            background-color: rgb(238, 242, 255);
          }
          50% {
            background-color: rgb(224, 231, 255);
          }
          100% {
            background-color: rgb(238, 242, 255);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-pulse-subtle {
          animation: pulse 0.5s ease-in-out;
        }
      `}</style>

      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Users className="mr-2 text-indigo-600" />
          Client Management
        </h2>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-lg">
          <Button
            variant={typeFilter === "All" ? "default" : "outline"}
            onClick={() => setTypeFilter("All")}
            className={`text-sm ${
              typeFilter === "All" ? "bg-indigo-600 hover:bg-indigo-700" : ""
            } transition-all duration-200`}
          >
            All Clients
          </Button>
          <Button
            variant={typeFilter === "Individual" ? "default" : "outline"}
            onClick={() => setTypeFilter("Individual")}
            className={`text-sm ${
              typeFilter === "Individual"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : ""
            } transition-all duration-200`}
          >
            <UserCircle size={16} className="mr-1" />
            Individuals
          </Button>
          <Button
            variant={typeFilter === "Company" ? "default" : "outline"}
            onClick={() => setTypeFilter("Company")}
            className={`text-sm ${
              typeFilter === "Company"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : ""
            } transition-all duration-200`}
          >
            <Building2 size={16} className="mr-1" />
            Companies
          </Button>
        </div>

        <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-md">
          <Filter size={14} className="mr-2 text-indigo-500" />
          <span>
            Showing <strong>{filteredData.length}</strong> of{" "}
            <strong>{mockClients.length}</strong> clients
          </span>
        </div>
      </div>

      <SortPanel
        sortOptions={sortOptions}
        onSortChange={setSortOptions}
        availableFields={availableFields}
      />

      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-gray-700 py-3"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition-colors duration-150 ${
                    isRowAnimated ? "animate-slideIn" : ""
                  }`}
                  style={{
                    animationDelay: `${idx * 0.03}s`,
                    transitionDelay: `${idx * 0.03}s`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-gray-500 animate-fadeIn">
                    <Users size={36} className="mb-2 text-gray-300" />
                    <p>No clients found</p>
                    <p className="text-sm">
                      Try changing your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-gray-500 text-center mt-2">
        Tip: Click on column headers to sort the table
      </div>
    </div>
  );
}
