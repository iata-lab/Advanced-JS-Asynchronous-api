const API_DOGS_ALL = new URL("https://dog.ceo/api/breeds/list/all");
const API_DOGS_RANDOM = new URL("https://dog.ceo/api/breeds/image/random");

// 1
function getAllBreeds() {
  return axios.get(API_DOGS_ALL).then((response) => {
    return Object.keys(response.data.message);
  });
}

// 2
function getRandomDog() {
  return axios.get(API_DOGS_RANDOM).then((response) => response.data.message);
}

// 3
function getAllImagesByBreed() {
  return axios
    .get(`https://dog.ceo/api/breed/komondor/images`)
    .then((response) => response.data.message);
}

// 4
function getAllImagesByBreed2(breed) {
  return axios
    .get(`https://dog.ceo/api/breed/${breed}/images`)
    .then((response) => response.data.message);
}

// 5
function getGitHubUserProfile(username) {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then((response) => response.data);
}

// 6
function printGithubUserProfile(username) {
  return getGitHubUserProfile(username)
    .then((data) => {
      const name = data.name;
      const avatar_url = data.avatar_url;
      return { img: avatar_url, name: name };
    })
    .then(({ img, name }) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${name}</h2>
        <img src="${img}" alt="${name}'s profile picture" />
      `;
      document.body.appendChild(div);
    })
    .catch((error) => {
      console.error("Error al imprimir perfil de GitHub:", error);
    });
}

// 7
function getAndPrintGitHubUserProfile(username) {
  return getGitHubUserProfile(username).then((data) => {
    return `
      <section>
        <img src="${data.avatar_url}" alt="imagen de usuario">
        <h1>${data.name}</h1>
        <p>Public repos: ${data.public_repos}</p>
      </section>
    `;
  });
}

// 9
function fetchGithubUsers(usernames) {
  const promises = usernames.map((username) => {
    return axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        console.log('Repository URL:', `https://github.com/${username}`);
        console.log('User name:', response.data.name);
        return {
          name: response.data.name,
          html_url: `https://github.com/${username}`,
        };
      });
  });

  return Promise.all(promises);
}

// 8
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const usernameInput = document.getElementById('username-input');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            getAndPrintGitHubUserProfile(username)
                .then(html => {
                    resultDiv.innerHTML = html;
                })
                .catch(error => {
                    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
                });
        }
    });
});
