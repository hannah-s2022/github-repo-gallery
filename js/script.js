// profile info will appear
const profileOverview = document.querySelector(".overview");
const username = "hannah-s2022";
const repoList = document.querySelector(".repo-list");

// fetch profile info from GitHub 
const gitProfileInfo = async function () {
    const profileInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await profileInfo.json();
    // console.log(profileInfo);
    displayProfileInfo(data);
};

gitProfileInfo();

// display profile info on webpage
const displayProfileInfo  = function (data) {
    const div = document.createElement("div");
    div.classList.add("user.info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  profileOverview.append(div);
  gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100
    `);
    const dataRepo = await fetchRepos.json();
    displayRepos(dataRepo);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li"); 
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};
