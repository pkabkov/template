import { API_KEY, fetchTrackInfo } from "./api.js";
import { showSectionTitleBefore, formatDuration } from "./utils.js";

/**
 * Настраивает поведение формы поиска:
 * - обработка отправки формы по кнопке со значком лупы и нажатия Enter в поле ввода;
 *   перенаправляет на страницу поиска с параметром q содержащий текст запроса;
 * - очистка поля ввода по нажатию кнопки с крестиком.
 */
function setupSearchInput() {
  const form = document.querySelector(".search-form");
  const input = document.querySelector(".search-input");
  const clearBtn = document.querySelector(".search-clear");
  if (!form || !input || !clearBtn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      window.location.href = `search.html?q=${encodeURIComponent(value)}`;
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input.value.trim();
      if (value) {
        window.location.href = `search.html?q=${encodeURIComponent(value)}`;
      }
    }
  });

  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    input.value = "";
    input.focus();
  });
}

/**
 * Загружает и отображает список артистов по поисковому запросу.
 * Отображает до 8 артистов с изображением, именем и количеством слушателей.
 *
 * @async
 * @param {string} encodedQuery - Закодированный поисковый запрос.
 */
async function fetchArtists(encodedQuery) {
  const artistSection = document.querySelectorAll(".main-section")[0];
  const artistGrid = artistSection.querySelector(".main-section-grid");
  artistGrid.innerHTML = "";

  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodedQuery}&api_key=${API_KEY}&format=json&limit=8`
    );
    const data = await res.json();
    const artists = data.results.artistmatches.artist;

    if (artists && artists.length > 0) {
      showSectionTitleBefore(artistGrid, "Artists", "main-section-title");
      artists.forEach((artist) => {
        const imgUrl = artist.image?.[2]?.["#text"] || "";
        const artistUrl = `https://www.last.fm/music/${encodeURIComponent(
          artist.name
        )}`;
        const card = document.createElement("div");
        card.className = "main-section-card";
        card.innerHTML = `
          <div class="main-section-bg" style="background: url('${imgUrl}') center/cover no-repeat;">
            <a href="${artistUrl}" target="_blank" class="artist-name">${
          artist.name
        }</a>
            <span class="artist-listeners">${parseInt(
              artist.listeners
            ).toLocaleString()} listeners</span>
          </div>
        `;
        artistGrid.appendChild(card);
      });
    } else {
      artistGrid.innerHTML = "";
    }
  } catch (error) {
    console.error("Error fetching artists:", error);
    artistGrid.innerHTML = "";
  }
}

/**
 * Загружает и отображает список альбомов по поисковому запросу.
 * Отображает до 8 альбомов с изображением, названием альбома и именем исполнителя.
 *
 * @async
 * @param {string} encodedQuery - Закодированный поисковый запрос.
 */
async function fetchAlbums(encodedQuery) {
  const albumSection = document.querySelectorAll(".main-section")[1];
  const albumGrid = albumSection.querySelector(".main-section-grid");
  albumGrid.innerHTML = "";

  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodedQuery}&api_key=${API_KEY}&format=json&limit=8`
    );
    const data = await res.json();
    const albums = data.results.albummatches.album;

    if (albums && albums.length > 0) {
      showSectionTitleBefore(albumGrid, "Albums", "main-section-title");
      albums.forEach((album) => {
        const imgUrl = album.image?.[2]?.["#text"] || "";
        const albumUrl = `https://www.last.fm/music/${encodeURIComponent(
          album.artist
        )}/${encodeURIComponent(album.name)}`;
        const artistUrl = `https://www.last.fm/music/${encodeURIComponent(
          album.artist
        )}`;
        const card = document.createElement("div");
        card.className = "main-section-card";
        card.innerHTML = `
          <div class="main-section-bg" style="background: url('${imgUrl}') center/cover no-repeat;">
            <a href="${albumUrl}" target="_blank" class="artist-name">${album.name}</a>
            <a href="${artistUrl}" target="_blank" class="artist-listeners">${album.artist}</a>
          </div>
        `;
        albumGrid.appendChild(card);
      });
    } else {
      albumGrid.innerHTML = "";
    }
  } catch (error) {
    console.error("Error fetching albums:", error);
    albumGrid.innerHTML = "";
  }
}

/**
 * Загружает и отображает список треков по поисковому запросу.
 * Отображает до 10 треков с обложкой, названием, исполнителем и длительностью.
 *
 * @async
 * @param {string} encodedQuery - Закодированный поисковый запрос.
 */
async function fetchTracks(encodedQuery) {
  const tracksSection = document.querySelector(".tracks-section");
  const trackList = tracksSection.querySelector(".tracks-list");
  trackList.innerHTML = "";

  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodedQuery}&api_key=${API_KEY}&format=json&limit=10`
    );
    const data = await res.json();
    const tracks = data.results.trackmatches.track;

    if (tracks && tracks.length > 0) {
      let title = tracksSection.querySelector(".main-section-title");
      if (!title) {
        title = document.createElement("h2");
        title.className = "main-section-title";
        tracksSection.insertBefore(title, trackList);
      }
      title.textContent = "Tracks";
      title.style.display = "block";

      const durations = await Promise.all(
        tracks.map((track) => fetchTrackInfo(track.artist, track.name))
      );

      tracks.forEach((track, i) => {
        const duration = durations[i];
        const row = document.createElement("div");
        row.className = "track-row";
        row.innerHTML = `
          <button class="track-play" aria-label="Play"></button>
          <button class="track-fav" aria-label="Favorite"></button>
          <img class="track-cover" src="${
            track.image?.[1]?.["#text"] || ""
          }" alt="${track.name}" />
          <span class="track-name">${track.name}</span>
          <span class="track-artist">${track.artist}</span>
          <span class="track-duration">${formatDuration(duration)}</span>
        `;
        trackList.appendChild(row);
      });
    } else {
      trackList.innerHTML = "";
      const title = tracksSection.querySelector(".main-section-title");
      if (title) title.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching tracks:", error);
    trackList.innerHTML = "";
    const title = tracksSection.querySelector(".main-section-title");
    if (title) title.style.display = "none";
  }
}

// ---------- ИНИЦИАЛИЗАЦИЯ ----------
document.addEventListener("DOMContentLoaded", async () => {
  setupSearchInput();

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  if (!query) return;

  const loweredQuery = query.toLowerCase();
  document.querySelector(".search-query").textContent = `“${query}”`;
  document.querySelector(".search-input").value = query;

  const encodedQuery = encodeURIComponent(loweredQuery);

  await Promise.all([
    fetchArtists(encodedQuery),
    fetchAlbums(encodedQuery),
    fetchTracks(encodedQuery),
  ]);
});
