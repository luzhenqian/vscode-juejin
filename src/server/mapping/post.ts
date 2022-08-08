import { Category } from "../../types";

export function categoriesMapping(raw: any[]): Category[] {
  return raw.map(({ category_id, category_name }) => ({
    id: category_id,
    name: category_name,
  }));
}
