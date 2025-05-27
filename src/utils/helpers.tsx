/**
 * Форматирует длительность трека из миллисекунд в формат "минуты:секунды".
 * Если длительность отсутствует или некорректна, возвращает "—".
 * 
 * @param {number|string} ms - Длительность трека в миллисекундах.
 * @returns {string} - Отформатированная длительность.
 */
export function formatDuration(ms: number | string): string {
  if (!ms || isNaN(Number(ms)) || ms === "0") return "—";
  const totalSeconds = Math.floor(Number(ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}