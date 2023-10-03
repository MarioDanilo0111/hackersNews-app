import axios from "axios";
import { NewsType } from "./news.types";

const get = async <T>(endpoints: string) => {
  const response = await axios.get<T>(endpoints);
  return response.data;
};

export const getNews = () => {
  return get<NewsType[]>("http://hn.algolia.com/api/v1/search?query=...");
};
