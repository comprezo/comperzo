import { fetchApi } from "@/utils/api";

export function fetchSize(url: string) {
   return fetchApi(`/get-size?url=${encodeURIComponent(url)}`);
}