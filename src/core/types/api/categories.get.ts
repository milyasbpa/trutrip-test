export interface GetCategoriesRequestInterface {
  params?: {
    title?: string;
    limit?: number;
    offset?: number;
    categoryId?: number;
  };
}

export interface GetCategoriesResponseInterface {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
