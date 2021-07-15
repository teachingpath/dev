export function createSlug(name) {
  const searchRegExp = /\s/g;
  const replaceWith = "-";
  return name.toLowerCase().replace(searchRegExp, replaceWith);
}

export function linkify(text) {
  var urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
}

export function escapeHtml(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
