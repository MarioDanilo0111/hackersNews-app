import axios, { AxiosResponse } from "axios";
import { NewsType } from "./news.types";

const get = async (endpoints: string) => {
  const response: AxiosResponse<NewsType> = await axios.get<NewsType>(
    endpoints
  );
  let news: NewsType = response.data;
  /* if statement to search for null items by title attribute */
  if (news.hits && Array.isArray(news.hits) && news.hits.length > 0) {
    news.hits = news.hits.filter((h: any) => h.title !== null);
  }
  return news;
};

export const getNews = () => {
  return get("http://hn.algolia.com/api/v1/search?tags=front_page");
};
