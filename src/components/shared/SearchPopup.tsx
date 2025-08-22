import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertTitle } from "../ui/alert";

/**
 * Search Popup
 */
export default function SearchPopup() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full !cursor-pointer flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Search ...</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[90vw] w-md !p-0">
        <div className="flex flex-col gap-4 bg-primary/10 p-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 !bg-transparent !outline-none !ring-0 !border-0 !border-b"
            />
          </div>

          {/* search results */}
          <div className="max-h-[50vh] overflow-auto">
            <div className="flex flex-col gap-3">
              {/* not found alert */}
              <Alert variant="destructive" className="!rounded-lg text-center">
                <AlertTitle>Oops! We couldn’t find that product.</AlertTitle>
              </Alert>

              {/* product skeleton */}
              {Array.from({ length: 10 }).map((_, index) => (
                <SearchSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Search skeleton
const SearchSkeleton = () => {
  return (
    <Card className="!py-3 !rounded-lg cursor-pointer">
      <CardContent className="flex items-center gap-3 !px-3">
        <Skeleton className="w-20 aspect-[16/13]" />
        <div className="flex flex-col flex-1 gap-3">
          <Skeleton className="w-full h-6" />
          <div className="flex items-center justify-between">
            <Skeleton className="w-10 h-6" />
            <Skeleton className="w-10 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
