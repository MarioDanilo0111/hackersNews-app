import "../src/css/style.scss";
import { getNews } from "./api.ts";
import { NewsType } from "./news.types.ts";
import { AxiosError } from "axios";

const newsEl = document.querySelector<HTMLUListElement>("#app")!;
const searchInput = document.querySelector<HTMLInputElement>("#searchInput");
const searchButton = document.querySelector<HTMLButtonElement>("#searchButton");
const searchResult = document.querySelector<HTMLUListElement>("#searchResult")!;

let news: NewsType[] = [];
const getNew = async (searchTerm?: string) => {
  // Fetch todos from server and update local copy
  try {
    news = await getNews();

    // Render News
    // Add search functionality here

    if (searchTerm && news && news.hits && Array.isArray(news.hits)) {
      const searchResults = news.hits.filter((hit) => {
        if (
          hit.title &&
          hit.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return hit.title;
        } else {
          return "";
        }
      });
      displaySearchResult(searchResults);
    } else if (news) {
      renderNews();
    }
  } catch (err) {
    handleFetchError(err);
  }
};

function handleFetchError(err: unknown) {
  if (err instanceof AxiosError) {
    alert("the isAxiosError");
  } else if (err instanceof Error) {
    alert("The instance of error ocurred" + err.message);
  } else {
    alert("This should never happen.");
  }
}

const renderNews = () => {
  if (
    news &&
    news.hits &&
    Array.isArray(news.hits) &&
    news.hits.length > 0 &&
    news.hits[0]
  ) {
    newsEl.innerHTML = news.hits
      .map(
        (hit: NewsType["hits"][0]) =>
          `<main >
        <div class="link-item">
          <a href="${hit.url}" class="link" target="_blank">
          <h3>${hit.title}</h3>
          </a>
          <h3>${hit.points}</h3>
          <h3>${hit.created_at}</h3>                  
          <p>${hit._highlightResult.author.value} points</p>
          </div>
          </main>`
      )
      .join("");
  }
};

function displaySearchResult(searchResults: NewsType["hits"][0][]) {
  if (searchResults && searchResults.length > 0) {
    searchResult.innerHTML = searchResults
      .map((hit) => {
        console.log(searchResults);
        return `
      <main>
      <div class="link-item">
      <a href="${hit.url}" class="link" target="_blank">
      <h3>${hit.title}</h3>
      </a>
      <h3>${hit.points}</h3>
      <h3>${hit.created_at}</h3>
      <p>${hit._highlightResult.author.value} points</p>
      </div>
      </main>
      `;
      })
      .join("");
  } else {
    // Clear the search results if there are no matches
    searchResult.innerHTML = "Not found";
  }
}

searchButton?.addEventListener("click", async () => {
  const searchTerm = searchInput?.value.trim();
  if (searchTerm) {
    getNew(searchTerm);
  } else {
    alert("Nothing matched");
  }
});

searchInput?.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton?.click();
  }
});

getNew();

/* const getNew = async () => {
  // Fetch todos from server and update local copy
  try {
    news = await getNews();
    renderNews();

    console.log(news);
    // Render todos
  } catch (err) {
    if (err instanceof AxiosError) {
      alert(err.isAxiosError);
    } else if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("This should never happen.");
    }
  }
}; */
