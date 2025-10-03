import { IUser } from "../components/types/types";

export function useGetCompanies(data: IUser[]): string[] {
  const companyNames = data.map((item) => item.company.name);
  return Array.from(new Set(companyNames));
}
