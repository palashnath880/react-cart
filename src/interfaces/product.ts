export type Product = {
  id: string;
  title: string;
  description: string;
  img_url: string;
  discount: number;
  price: {
    base: number;
    variants: { size: string; color: string; price: number }[];
  };
  category_name: string;
  category_slug: string;
  avg_rating: number;
  rating_count: number;
};
