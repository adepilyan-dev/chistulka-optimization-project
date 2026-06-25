export const API_URL = "https://functions.poehali.dev/0cb39cbb-0651-41ab-bd6f-8c9932206449";
export const INDEXNOW_URL = "https://functions.poehali.dev/ecd240df-f369-4051-8134-8b010135c891";

export interface PageSeo {
  page_key: string;
  page_label: string;
  title: string;
  description: string;
  keywords: string;
  schema_json: string;
  updated_at: string | null;
}

export interface SeoData {
  pages: PageSeo[];
  robots: string;
}

export type Tab = "pages" | "robots" | "sitemap" | "indexnow";

export interface IndexNowResult {
  urls_sent: number;
  results: { endpoint: string; status: number; error?: string }[];
}

export interface PageForm {
  title: string;
  description: string;
  keywords: string;
  schema_json: string;
}
