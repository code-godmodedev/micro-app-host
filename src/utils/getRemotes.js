import remotes from "./../data/remotes.prod.json";

export default function getRemotes() {
  return new Promise((resolve, reject) => {
    if (remotes) resolve(remotes);
    reject("remotes data not found");
  });
}
