import { URL_POSTS } from "@/services/EndPoints";

export const getPublis = async (urlMonitor: string) => {
  const response = await fetch(urlMonitor + URL_POSTS);
  const data = await response.json();
  return await data;
};
