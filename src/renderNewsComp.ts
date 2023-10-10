/* Rendering News */
import { getNews } from "./api";
import { NewsType } from "./news.types";
import {
  prevButton,
  nextButton,
  formatDate,
  hourCreated,
  currentPage,
  hitsPages,
} from "./main";

/* To render  */
const newsEl = document.querySelector<HTMLUListElement>("#app")!;
/* Page number */
const inputValuePagi =
  document.querySelector<HTMLInputElement>("#inputValuePagi");

let news: any = [];
news = await getNews();

/* Number of items per page */
const itemsPerPage: number = 5;

function renderNews(page: number) {
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
            : hit.title
            ? `<a href="${hit.story_url}" class="link"><h2>${
                hit.title.length > 50
                  ? `${hit.title.slice(0, 10)}...`
                  : hit.title
              }</h2></a>`
            : ""
        }
          <h3>Points scored: ${hit.points}</h3>
          <h3>Date of creation: ${formatDate(hit.created_at)}</h3>
          <h3>Exact time: ${hourCreated(hit.created_at)}</h3>
          <h3>Created by: ${hit.author} </h3>
          </div>
          </main>`
      )
      .join("");
  }
}

export default renderNews;
