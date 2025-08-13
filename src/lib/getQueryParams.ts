import { headers } from "next/headers";

const getQueryParams = async () => {
  const headerList = headers();
  const url = new URL((await headerList).get("referer") || "");
  return url.searchParams;
};

export default getQueryParams;
