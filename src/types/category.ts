export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryListResponse {
  status: number;
  message: string;
  data: {
    items: Category[];
    total_items: number;
    page: number;
    total_pages: number;
    links: {
      prev: string | null;
      next: string | null;
    };
  };
}
