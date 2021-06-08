import metaFetcher from 'meta-fetcher';

async function metadataHandler(req, res) {
  if (req.method === "GET") {
    try {
      const url = req.query.url;  
      const result = await metaFetcher(url);
      res.status(200).json(result)
    } catch (err) {
      res.status(401).send("Invalid authentication")
    }
  }
}

export default metadataHandler
