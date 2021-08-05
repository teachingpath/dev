

const templates = {
  "welcome-coach": "d-4cae42db9cc94a2cbc1e8d1593a2ae98",
  "welcome-trainee": "d-b74cdd5d179544f5b89390955f49e0d0",
  "start-pathway": "d-5b859cf0abdd402f9e25ff4645efc668",
};
async function sendemailHandler(req, res) {
  if (req.method === "GET") {
    try {
      const msg = {
        to: req.query.email,
        from: "teachingpath.dev@gmail.com",
        templateId: templates[req.query.template],
        dynamic_template_data: { ...req.query },
      };
      res.status(200).json({});
    } catch (err) {
      res.status(401).send("Invalid authentication");
    }
  }
}

export default sendemailHandler;
