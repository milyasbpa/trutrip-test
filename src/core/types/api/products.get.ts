export interface GetProductsRequestInterface {
  params?: {
    title?: string;
    limit?: number;
    offset?: number;
    categoryId?: number;
  };
}

export interface GetProductsResponseInterface {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
}
