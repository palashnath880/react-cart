import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import getQueryParams from "@/lib/getQueryParams";

type MyPaginationProps = {
  total: number;
  current: number;
};

// get pages range
function getRange(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = currentPage - 2;
  let end = currentPage + 2;

  if (start < 1) {
    start = 1;
    end = 5;
  } else if (end > totalPages) {
    end = totalPages;
    start = totalPages - 4;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default async function MyPagination({ total }: MyPaginationProps) {
  const params = await getQueryParams();
  const current = Number(params.get("page")) || 1;

  params.set("page", (current - 1).toString()); // set previous page number
  const prevURL = `?${params.toString()}`;

  params.set("page", (current + 1).toString()); // set next page number
  const nextURL = `?${params.toString()}`;

  const pages = getRange(current, total);

  return (
    <Pagination>
      <PaginationContent>
        {/* previous button */}
        {current > 1 && (
          <PaginationItem>
            <PaginationPrevious href={prevURL} />
          </PaginationItem>
        )}

        {/* render pages */}
        {pages.map(async (item) => {
          params.set("page", item.toString()); // set page number
          return (
            <PaginationItem key={item}>
              <PaginationLink
                href={`?${params.toString()}`}
                isActive={current === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* next button */}
        {current > 0 && total > current && (
          <PaginationItem>
            <PaginationNext href={nextURL} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
