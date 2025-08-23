import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";

// MyBreadcrumb component props
type MyBreadcrumbProps = {
  links: { path?: string; name: string }[];
};

export default function MyBreadcrumb({ links }: MyBreadcrumbProps) {
  return (
    <div className="w-full border-b pb-2 border-primary/40">
      <Breadcrumb>
        <BreadcrumbList>
          {Array.isArray(links) &&
            links.map(({ name, path }, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {path ? (
                    <BreadcrumbLink asChild>
                      <Link href={path}>{name}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="last:hidden" />
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
