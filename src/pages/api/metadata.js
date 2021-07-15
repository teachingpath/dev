const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");

async function metadataHandler(req, res) {
  if (req.method === "GET") {
    try {
      const url = decodeURI(req.query.url);
      var headers = new Headers();
      headers.append("Content-Type", "application/json;charset=utf-8");
      const response = await fetch(url, headers);
      const html = await response.text();
      const doc = domino.createWindow(html).document;
      const metadata = getMetadata(doc, url);
      res.status(200).json(metadata);
    } catch (err) {
      res.status(401).send("Invalid authentication");
    }
  }
}

export default metadataHandler;
