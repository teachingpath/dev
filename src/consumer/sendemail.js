export function sendFinishPathway(email, name) {
  const url =
    "/api/sendemail/?email=" + email + "&template=finish-pathway&name=" + name;

  return fetch(url).then((res) => res.json());
}

export function sendFinishRunner(email, name) {
  const url =
    "/api/sendemail/?email=" + email + "&template=finish-runner&name=" + name;

  return fetch(url).then((res) => res.json());
}

export function sendStartPathway(email, name) {
  const sendeamil =
    "/api/sendemail/?email=" + email + "&template=start-pathway&name=" + name;
  return fetch(sendeamil).then((res) => res.json());
}

export function sendFeedback(email, track, resp, feedback, replyTo) {
  const sendeamil =
    "/api/sendemail/?email=" +
    email +
    "&template=feedback&track=" +
    track +
    "&feedback=" +
    feedback +
    "&replyTo=" +
    replyTo +
    "&resp=" +
    resp;
  return fetch(sendeamil).then((res) => res.json());
}

export function sendNewRegister(profile, email, firstName) {
  const template = "welcome-" + (profile === true ? "coach" : "trainee");
  const url =
    "/api/sendemail/?email=" +
    email +
    "&template=" +
    template +
    "&name=" +
    firstName;
  return fetch(url).then((res) => res.json());
}
