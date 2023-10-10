/* Search Render Function */
import "./css/styleSearch.scss";
import { getNew, formatDate, hourCreated } from "./main.ts";

import { NewsType } from "./news.types.ts";

const searchInput = document.querySelector<HTMLInputElement>("#searchInput");
const searchButton = document.querySelector<HTMLButtonElement>("#searchButton");
const searchResult = document.querySelector<HTMLUListElement>("#searchResult")!;

function displaySearchResult(searchResults?: NewsType["hits"][0][] | null) {
  if (searchResults && searchResults.length > 0) {
    searchResult.innerHTML = searchResults
      .map((hit) => {
        return `
      <main>
      <div class="link-itemSearch">
      <h2>Search Result</h2>
      ${
        hit.url
          ? `<a href="${hit.url}" class="link">
              ${
                hit.title
                  ? hit.title.length > 30
                    ? `${hit.title.slice(0, 13)}...`
                    : hit.title
                  : "No title"
              }
            </a>`
          : `<a href="${hit.story_url}" class="link"><h3>${hit.title}</h3></a>`
      }
      <h3>Points scored: ${hit.points}</h3>
      <h3>Date of creation: ${formatDate(hit.created_at)}</h3>
      <h3>Exact time: ${hourCreated(hit.created_at)}</h3>
      <h3>Created by: ${hit.author} </h3>
      </div>
      </main>
      `;
      })
      .join("");
  } else if (searchResults === null) {
    searchResult.innerHTML = "";
  } else {
    // Clear the search results if there are no matches
    searchResult.innerHTML = "<h1>SEARCH NOT FOUND</h1>";
  }
}

/* Handle event listner to button Search */
searchButton?.addEventListener("click", async () => {
  let searchTerm = searchInput?.value.trim();
  if (searchTerm) {
    getNew(searchTerm);
    searchTerm = "";
  } else {
    getNew(null);
  }
});

/* Event listner to on click Enter when searching */
searchInput?.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton?.click();
    // Clear the input field
    searchInput.value = "";
  }
});
export default displaySearchResult;
