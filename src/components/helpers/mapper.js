export function createSlug(name) {
  const searchRegExp = /\s/g;
  const replaceWith = "-";
  return name.toLowerCase().replace(searchRegExp, replaceWith);
}

export function linkify(text) {
  var urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" rel="noopener noreferrer" target="_blank">' +
      url +
      "</a>"
    );
  });
}

export function escapeHtml(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function linkResume(id, user) {
  const host = window.location.host;
  return id
    ? '<i><a href="/'+host+'/pathway/resume?id=' +
        id +
        '" rel="noopener noreferrer" target="_blank">' +
        user.displayName +
        "</a></i>"
    : "<i>" + user.displayName + "</i>";
}

export function linkRunner(id, name, description = "__LINK__") {
  const str =
    '<i><a href="/catalog/runner?id=' +
    id +
    '" rel="noopener noreferrer" target="_blank">' +
    name +
    "</a></i>";
  return description.replaceAll("__LINK__", str);
}

export function linkPathway(id, name, description = "__LINK__") {
  const str =
    '<i><a href="/catalog/pathway?id=' +
    id +
    '" rel="noopener noreferrer" target="_blank">' +
    name +
    "</a></i>";
  return description.replaceAll("__LINK__", str);
}

export function linkTrack(id, runnerId, name, description = "__LINK__") {
  const str =
    '<i><a href="/catalog/track?id=' +
    id +
    "&runnerId=" +
    runnerId +
    '" rel="noopener noreferrer" target="_blank">' +
    name +
    "</a></i>";
  return description.replaceAll("__LINK__", str);
}

export function activityMapper(
  type,
  msn,
  msnForGroup,
  group = "default",
  totalPoints = 10
) {
  return {
    type: type,
    msn: msn,
    point: totalPoints,
    msnForGroup: msnForGroup,
    group: group,
  };
}

export function linkGroup(journyId, user, description) {
  return linkResume(journyId, user) + " " + description;
}
