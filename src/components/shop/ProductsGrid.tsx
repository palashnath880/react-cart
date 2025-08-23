import React from "react";
import Product from "../shared/Product";
import products from "../../../data/products.json";
import MyPagination from "../shared/MyPagination";

type ProductsGridProps = {
  search?: string;
  priceRange?: [];
  rating?: number;
  brands?: string[];
};

export default async function ProductsGrid(props: ProductsGridProps) {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(props);
  return (
    <div className="flex flex-col flex-1 gap-10">
      <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3`}>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      <MyPagination total={50} current={1} />
    </div>
  );
}
