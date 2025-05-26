import {
  getTopTagsForArtist,
  getTopArtists,
  getTopTracks,
  getTopTagsForTrack,
} from "./api.js";
import { showSectionTitleBefore } from "./utils.js";

/**
 * Загружает список топ-артистов и их теги и отображает в контейнере ".more-tags-list".
 *
 * @async
 * @returns {Promise<void>}
 */
async function renderTopArtists() {
  const artists = await getTopArtists();
  const container = document.querySelector(".more-tags-list");
  container.innerHTML = "";
  showSectionTitleBefore(container, "Hot right now", "section-title");
  if (!artists || artists.length === 0) return;

  const tagPromises = artists.map((artist) => getTopTagsForArtist(artist.name));
  const allTags = await Promise.all(tagPromises);

  artists.forEach((artist, index) => {
    const name = artist.name;
    const image =
      artist.image?.find((img) => img.size === "extralarge")?.["#text"] || "";
    const tags = allTags[index] || [];
    const card = document.createElement("li");
    card.className = "card";
    card.innerHTML = `
      <a href="https://www.last.fm/music/${encodeURIComponent(
        name
      )}" target="_blank">
        <div class="medium-circle-tag" style="background: url('${image}') center/cover no-repeat;"></div>
      </a>
      <div class="card-info">
        <a class="card-name" href="https://www.last.fm/music/${encodeURIComponent(
          name
        )}" target="_blank">${name}</a>
        <div class="card-bottom-tags-list">
          ${tags
            .map(
              (tag) =>
                `<a href="https://www.last.fm/tag/${encodeURIComponent(
                  tag
                )}" target="_blank" class="card-bottom">${tag}</a>`
            )
            .join("")}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Загружает список топ-треков и их теги и отображает в контейнере ".small-tracks-container".
 *
 * @async
 * @returns {Promise<void>}
 */
async function renderTopTracks() {
  const tracks = await getTopTracks();
  const container = document.querySelector(".small-tracks-container");
  container.innerHTML = "";
  showSectionTitleBefore(container, "Popular tracks", "section-title");
  if (!tracks || tracks.length === 0) return;

  const tagPromises = tracks.map((track) =>
    getTopTagsForTrack(track.artist.name, track.name)
  );
  const allTags = await Promise.all(tagPromises);

  tracks.forEach((track, index) => {
    const name = track.name;
    const artist = track.artist.name;
    const image =
      track.image?.find((img) => img.size === "extralarge")?.["#text"] || "";
    const tags = allTags[index] || [];
    const card = document.createElement("li");
    card.className = "small-track-card";
    card.innerHTML = `
      <a href="https://www.last.fm/music/${encodeURIComponent(
        artist
      )}/${encodeURIComponent(name)}" target="_blank">
        <div class="small-track-image" style="background: url('${image}') center/cover no-repeat;"></div>
      </a>
      <div class="small-track-info">
        <a class="card-name" href="https://www.last.fm/music/${encodeURIComponent(
          artist
        )}/${encodeURIComponent(name)}" target="_blank">${name}</a>
        <a href="https://www.last.fm/music/${encodeURIComponent(
          artist
        )}" target="_blank" class="middle-card-text">${artist}</a>
        <div class="card-bottom-tags-list">
          ${tags
            .map(
              (tag) =>
                `<a href="https://www.last.fm/tag/${encodeURIComponent(
                  tag
                )}" target="_blank" class="card-bottom">${tag}</a>`
            )
            .join("")}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Настройка навигации на поиск в контейнере ".head-nav-container":
 * - при клике на лупу отображает форму поиска;
 * - при клике на кнопку с крестиком внутри формы - восстанавливает исходную навигацию;
 * - при клике на кнопку с лупой внутри формы -
 *   направляет по страницу выдачи search.html с параметром q содержащий текст запроса.
 */
function setupNavSearch() {
  const container = document.querySelector(".head-nav-container");
  if (!container) return;
  const originalHTML = container.innerHTML;

  const htmlWithNav = `
    <div class="head-search-bar-container">
      <form class="head-search-form" onsubmit="return false;">
        <input type="text" class="head-search-input" placeholder="Search for music..." />
        <button class="head-search-back" type="button" aria-label="Back">
            <svg width="24" height="24"></svg>
        </button>
        <button class="head-search-submit" type="submit" aria-label="Search"></button>
      </form>
    </div>
  `;
  container.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".head-search-toggle-btn")) {
      container.innerHTML = htmlWithNav;
      const searchInput = container.querySelector(".head-search-input");
      searchInput?.focus();
    }
    if (target.closest(".head-search-back")) {
      container.innerHTML = originalHTML;
    }
  });

  const observer = new MutationObserver(() => {
    const formContainer = document.querySelector(".head-search-bar-container");
    const input = document.querySelector(".head-search-input");
    const button = document.querySelector(".head-search-submit");
    if (formContainer && input && button) {
      button.addEventListener("click", () => {
        const query = input.value.trim();
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      });
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ---------- ИНИЦИАЛИЗАЦИЯ ----------
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([renderTopArtists(), renderTopTracks()]);
  setupNavSearch();
});
