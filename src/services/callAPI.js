export function getAdalabers() {
  return fetch('https://api.github.com/orgs/Adalab/members?per_page=200')
  .then(response =>  response.json())
}

export function getUserInfo(user) {
  return fetch(`https://api.github.com/users/${user}`)
  .then(response =>  response.json())
}