export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  status: "draft" | "published";
  isHot: boolean; // Add this field
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  categoryId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ArticleListResponse {
  data: {
    items: Article[];
    total_items: number;
    page: number;
    total_pages: number;
    links: {
      prev: string | null;
      next: string | null;
    };
    meta?: {
      publishedCount: number;
      draftCount: number;
    };
  };
}
