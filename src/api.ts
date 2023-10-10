import axios from "axios";
import { NewsType } from "./news.types";

const get = async <T>(endpoints: string) => {
  const response = await axios.get<T>(endpoints);
  let news: any = response.data;
  /* if statement to search for null items by title attribute */
  if (news && news.hits && Array.isArray(news.hits) && news.hits.length > 0) {
    news.hits = news.hits.filter((h: any) => h.title !== null);
  }
  return news;
};

export const getNews = () => {
  return get<NewsType[]>("http://hn.algolia.com/api/v1/search?tags=front_page");
};
