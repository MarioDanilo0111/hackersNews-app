import "../src/css/style.scss";
import { getNews } from "./api.ts";
import { AxiosError } from "axios";
import displaySearchResult from "./searchFunc.ts";
import renderNews from "./renderNewsComp.ts";

/*  Add event listeners for pagination buttons */
export const prevButton =
  document.querySelector<HTMLButtonElement>("#prevButton");
export const nextButton =
  document.querySelector<HTMLButtonElement>("#nextButton");

export let news: any = [];
export let hitsPages: number = 0;

/* formating date */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* formating hour */
export const hourCreated = (dataString: string): string => {
  const date = new Date(dataString);
  const hour = date.getUTCHours();
  const min = date.getUTCMinutes();
  return `${hour}:${min}`;
};

/* track the current page */
export let currentPage = 0;

/*  Function to handle pagination */
const handlePagination = (direction: "prev" | "next") => {
  if (direction === "prev" && currentPage > 0) {
    currentPage--;
  } else if (
    direction === "next" &&
    news &&
    news.hits &&
    Array.isArray(news.hits) &&
    currentPage < hitsPages - 1
  ) {
    currentPage++;
  }
  /*  Re-render the current page */
  renderNews(currentPage);
};
/* Previous Button */
prevButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  handlePagination("prev");
});
/* Next Button */
nextButton?.addEventListener("click", async (event) => {
  event.preventDefault();
  handlePagination("next");
});

/* Get the items from Hacker news Page */
export const getNew = async (searchTerm?: string | null) => {
  // Fetch todos from server and update local copy
  /* Handel input value null */
  if (searchTerm !== null) {
    try {
      news = await getNews();
      hitsPages =
        news && news.hits && Array.isArray(news.hits)
          ? news.hits.length / 5
          : 0;
      // Add search functionality here
      if (searchTerm && news && news.hits && Array.isArray(news.hits)) {
        const searchResults = news.hits.filter((hit: any) => {
          const attributesToSearch: (keyof typeof hit)[] = [
            "title",
            "author",
            "created_at",
            "points",
          ];
          return attributesToSearch.some((attribute) => {
            const value = hit[attribute];
            if (
              value &&
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
            return false;
          });
        });
        if (searchResults) {
          displaySearchResult(searchResults);
        }
      } else if (news) {
        /*  Render News */
        renderNews(currentPage);
      }
    } catch (err) {
      handleFetchError(err);
    }
  } else {
    displaySearchResult(null);
  }
};

/* if Error occur */
function handleFetchError(err: unknown) {
  if (err instanceof AxiosError) {
    alert("the isAxiosError");
    getNew;
  } else if (err instanceof Error) {
    alert("The instance of error ocurred" + err.message);
  } else {
    alert("This should never happen.");
  }
}

export default getNew();
