/**
 * Отображает заголовок секции перед указанным контейнером.
 *
 * @param {HTMLElement} container - Элемент-контейнер, перед которым будет вставлен заголовок.
 * @param {string} titleText - Текст заголовка.
 * @param {string} className - Класс контейнера.
 */
export function showSectionTitleBefore(container, titleText, className) {
  const parent = container.parentElement;
  if (!parent) return;
  let title = parent.querySelector(".section-title");

  title = document.createElement("h2");
  title.className = className;
  parent.insertBefore(title, container);

  title.textContent = titleText;
  title.style.display = "block";
}

/**
 * Форматирует длительность трека из миллисекунд в формат "минуты:секунды".
 * Если длительность отсутствует или некорректна, возвращает "—".
 * 
 * @param {number|string} ms - Длительность трека в миллисекундах.
 * @returns {string} - Отформатированная длительность.
 */
export function formatDuration(ms) {
  if (!ms || isNaN(ms) || ms === "0") return "—";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}