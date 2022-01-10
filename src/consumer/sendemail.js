import { linkResume } from "components/helpers/mapper";
import journey from "pages/catalog/journey";

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

export function sendNotifyNewMember(
  email,
  memberName,
  leaderEmail,
  pathwayName
) {
  const sendeamil =
    "/api/sendemail/?email=" +
    leaderEmail +
    "&template=new-member-to-pathway&name=" +
    memberName +
    "&pathway=" +
    pathwayName +
    "&replyTo=" +
    email;
  return fetch(sendeamil).then((res) => res.json());
}

export function sendNotifyResponseHacking(
  journeyId,
  email,
  memberName,
  leaderEmail,
  hackingName
) {
  const host = window.location.host;
  const sendeamil =
    "/api/sendemail/?email=" +
    leaderEmail +
    "&template=new-response-to-hacking&name=" +
    memberName +
    "&hackingName=" +
    hackingName +
    "&replyTo=" +
    email +
    "&id=" +
    journeyId +
    "&host=" +
    host;
  return fetch(sendeamil).then((res) => res.json());
}

export function sendFeedback(
  email,
  track,
  resp,
  feedback,
  replyTo,
  score = "none"
) {
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
    resp +
    "&score=" +
    score;
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
