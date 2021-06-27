export function createSlug(name) {
  const searchRegExp = /\s/g;
  const replaceWith = "-";
  return name.toLowerCase().replace(searchRegExp, replaceWith);
}
