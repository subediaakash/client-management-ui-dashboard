export interface IClientData {
  id: number;
  name: string;
  type: "Individual" | "Company";
  email: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

export interface SortCriterion {
  id: string;
  field: string;
  direction: "asc" | "desc";
}
