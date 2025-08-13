import ProductFilter from "@/components/shop/ProductFilter";
import React, { Suspense } from "react";
import ProductsGrid from "@/components/shop/ProductsGrid";
import ProductsSkeleton from "@/components/shop/ProductsSkeleton";

export default function page() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <ProductFilter />

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            {/* <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {products.length} products
              </span>
              <Badge variant="secondary">Electronics</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select defaultValue="featured">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div> */}

            {/* Products Grid */}
            <Suspense fallback={<ProductsSkeleton />}>
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
