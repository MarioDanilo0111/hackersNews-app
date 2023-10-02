/* 
import { NewsType } from "./news.types";

let newesList: NewsType;

export const newsByTitle = (
  searchTitle: string
): NewsType["hits"][0] | undefined => {
  const fundeItem = newesList.hits.find((item) => item.title === searchTitle);
  console.log(fundeItem);
  return fundeItem;
};
const result = newsByTitle("Example Title");
if (result) {
  console.log(result.title); // Access the title of the found item
} else {
  console.log("Title not found");
}
 */
