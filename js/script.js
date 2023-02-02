// profile info will appear
const profileOverview = document.querySelector(".overview");
const username = "hannah-s2022";
const repoList = document.querySelector(".repo-list");
const reposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
    div.classList.add("user-info");
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
  gitRepos(username);
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100
    `);
    const dataRepo = await fetchRepos.json();
    displayRepos(dataRepo);
};

// displays repo gallery
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li"); 
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoName);
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function (repoName) {
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}
    `);
    const repoInfo = await getInfo.json();
    console.log(repoInfo);
    // get data from languae_url property of repoInfo
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    // console.log(languages);
    displaySpecificInfo(repoInfo, languages);
};

    // will display specific repo info
    const displaySpecificInfo = function (repoInfo, languages) {
        viewReposButton.classList.remove("hide");
        repoData.innerHTML = "";
        repoData.classList.remove("hide");
        reposContainer.classList.add("hide");
        const div = document.createElement("div");
        div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
        repoData.append(div);
    };

    viewReposButton.addEventListener("click", function () {
        reposContainer.classList.remove("hide");
        repoData.classList.add("hide");
        viewReposButton.classList.add("hide");
    });

    // dynamic search 
    filterInput.addEventListener("input", function (e) {
        const searchText = e.target.value;
        const allRepos = document.querySelectorAll(".repo");
        const lowerSearchText = searchText.toLowerCase();

        for (const repo of allRepos) {
            const repoLowerText = repo.innerText.toLowerCase();
            if (repoLowerText.includes(lowerSearchText)) {
                repo.classList.remove("hide");
            } else {
                repo.classList.add("hide");
            }
        }
    });

