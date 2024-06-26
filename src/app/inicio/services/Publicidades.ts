import { URL_POSTS } from "@/services/EndPoints";

export const getPublis = async () => {
  const response = await fetch(URL_POSTS);
  const data = await response.json();
  return await data;
};
