import "../src/css/style.scss";
import { getNews } from "./api.ts";
import { NewsType } from "./news.types.ts";
import { AxiosError } from "axios";

const newsEl = document.querySelector<HTMLUListElement>("#app")!;
const searchInput = document.querySelector<HTMLInputElement>("#searchInput");
const searchButton = document.querySelector<HTMLButtonElement>("#searchButton");
const searchResult = document.querySelector<HTMLUListElement>("#searchResult")!;

/*  Add event listeners for pagination buttons */
const prevButton = document.querySelector<HTMLButtonElement>("#prevButton");
const nextButton = document.querySelector<HTMLButtonElement>("#nextButton");
const inputValuePagi =
  document.querySelector<HTMLInputElement>("#inputValuePagi");

let news: any = [];
let hitsPages: number = 0;

/* formating date */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* formating hour */
const hourCreated = (dataString: string): string => {
  const date = new Date(dataString);
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${hour}:${min}`;
};

/* Number of items per page */
const itemsPerPage: number = 5;
/* track the current page */
let currentPage = 0;

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
const getNew = async (searchTerm?: string) => {
  // Fetch todos from server and update local copy

  try {
    news = await getNews();
    hitsPages =
      news && news.hits && Array.isArray(news.hits) ? news.hits.length / 5 : 0;
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
      displaySearchResult(searchResults);
    } else if (news) {
      /*  Render News */
      renderNews(currentPage);
    }
  } catch (err) {
    handleFetchError(err);
  }
};

/* if Error occur */
function handleFetchError(err: unknown) {
  if (err instanceof AxiosError) {
    alert("the isAxiosError");
  } else if (err instanceof Error) {
    alert("The instance of error ocurred" + err.message);
  } else {
    alert("This should never happen.");
  }
}

/* Rendering News */
const renderNews = (page: number) => {
  /* if statement to inabilitate buttons */
  let pa = currentPage + 1;
  if (prevButton && pa <= 1) {
    prevButton.disabled = true;
  } else if (prevButton && pa > 0) {
    prevButton.disabled = false;
  }

  if (nextButton && pa == hitsPages) {
    nextButton.disabled = true;
  } else if (nextButton && pa < hitsPages) {
    nextButton.disabled = false;
  }

  if (inputValuePagi) {
    inputValuePagi.disabled = true;
    inputValuePagi.value = `Page nr: ${pa}`;
  }
  /*  Calculate the range of news articles to render based on the page number */
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (
    news &&
    news.hits &&
    Array.isArray(news.hits) &&
    news.hits.length > 0 &&
    news.hits[0]
  ) {
    newsEl.innerHTML = news.hits
      .slice(startIndex, endIndex)
      .map(
        (hit: NewsType["hits"][0]) =>
          `<main >
        <div class="link-item">
        ${
          hit.url
            ? `<a href="${hit.url}" class="link">
              ${
                hit.title
                  ? hit.title.length > 50
                    ? `${hit.title.slice(0, 30)}...`
                    : hit.title
                  : "No title"
              }
            </a>`
            : `<a href="${hit.url}" class="link"><h3>${hit._highlightResult.title.value}</h3></a>`
        }
          <h3>Points: ${hit.points}</h3>
          <h3>Created at: ${formatDate(hit.created_at)}</h3>
          <h3>Exact time: ${hourCreated(hit.created_at)}</h3>
          <p>Author: ${hit.author} </p>
          </div>
          </main>`
      )
      .join("");
  }
};

/* Search Render Function */
function displaySearchResult(searchResults: NewsType["hits"][0][]) {
  if (searchResults && searchResults.length > 0) {
    searchResult.innerHTML = searchResults
      .map((hit) => {
        return `
      <main>
      <div class="link-item">
      /* Slice link text */
      ${
        hit.url
          ? `<a href="${hit.url}" class="link">
              ${
                hit.title
                  ? hit.title.length > 50
                    ? `${hit.title.slice(0, 50)}...`
                    : hit.title
                  : "No title"
              }
            </a>`
          : `<a href="${hit.url}" class="link"><h3>${hit._highlightResult.title.value}</h3></a>`
      }
      <h3>${hit.points}</h3>
      <h3>${formatDate(hit.created_at)}</h3>
      <h3>Exact time: ${hourCreated(hit.created_at)}</h3>
      <p>${hit._highlightResult.author.value} </p>
      </div>
      </main>
      `;
      })
      .join("");
  } else {
    // Clear the search results if there are no matches
    searchResult.innerHTML = "<h1>NOT FOUND</h1>";
  }
}

/* Handle event listner to button Search */
searchButton?.addEventListener("click", async () => {
  const searchTerm = searchInput?.value.trim();
  if (searchTerm) {
    getNew(searchTerm);
  } else {
    alert("Nothing matched");
  }
});

/* Event listner to on click Enter when searching */
searchInput?.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton?.click();
  }
});

getNew();
