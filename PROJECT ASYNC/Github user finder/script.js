let search = document.getElementById("search-button");
let input = document.getElementById("username");
let profileCard = document.getElementById("profile");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not Found ⚠️.");
    return raw.json();
  });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) throw new Error("Can't fetch repos...");
    return raw.json();
  });
}

function loadProfileData(details) {
  let data = ` <img src="${details.avatar_url}" alt="Avatar" >
    <h2>${details.name || details.login}</h2>
    <p>${details.bio || "No bio provided"}</p>
    <p><strong>Location:</strong> ${details.location || "Unknown"}</p>
    <p><strong>Followers:</strong> ${details.followers}</p>
    <p><strong>Following:</strong> ${details.following}</p>
    <p><strong>Public Repos:</strong> ${details.public_repos}</p>
    <p><a href="${details.html_url}" target="_blank">View in GITHUB</a></p>
  `;

  profileCard.innerHTML = data;
}

search.addEventListener("click", () => {
  let userinput = input.value.trim();
  if (userinput.length > 0) {
    getProfileData(userinput)
      .then((data) => {
        loadProfileData(data);
      })
      .catch((err) => {
        profileCard.innerHTML = `<p style="color: red;">${err.message}</p>`;
        profileCard.style.display = "block"; // in case it's hidden
      });
  } else {
    alert("Please enter a GitHub username.");
  }
});
