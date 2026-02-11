
export enum CategoryType {
  LEARN = 'Learn PM / Data Things',
  CHECKLISTS = 'Checklists / Cheat Sheets',
  RESEARCH = 'Industry Research',
  CASE_STUDIES = 'Real World Case Studies',
  TEARDOWNS = 'Product Teardowns',
  HYPOTHETICAL = 'Hypothetical Features',
  CAREER = 'Career / Interview Chronicles'
}

export interface IdeaResult {
  category: CategoryType;
  title: string;
  subtitle?: string;
  components: Record<string, string>;
  validationScore: number;
  rulesApplied: string[];
}

export interface CategoryData {
  id: string;
  type: CategoryType;
  formula: (parts: Record<string, string>) => string;
  columns: Record<string, string[]>;
}
