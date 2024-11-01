export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Date(dateString).toLocaleString("en-US", options);
}

export function parseHtml(HTMLString: string): string {
  const parser = new DOMParser();
  const html = parser.parseFromString(HTMLString, "text/html");
  const text = html.body.textContent || "";
  return text;
}