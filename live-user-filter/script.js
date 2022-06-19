const result = document.querySelector("#result");
const filter = document.querySelector("#filter");
const listItems = []; //to put users that we fetch

const apiURL = "https://randomuser.me/api?results=50";
getData();

filter.addEventListener("input", (e) => filterData(e.target.value));

async function getData() {
  const response = await fetch(apiURL);
  const data = await response.json();
  const { results } = data;

  //clear the results
  result.innerHTML = "";
  results.forEach((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}"">
    <div class="user-info">
    <h4>${user.name.first} ${user.name.last}</h4>
    <p>${user.location.city}, ${user.location.country}</p>
    `;

    result.appendChild(li);
  });
}

function filterData(searchTerm) {
  listItems.forEach((item) =>
    item.innerText.toLowerCase().includes(searchTerm.toLowerCase())
      ? item.classList.remove("hide")
      : item.classList.add("hide")
  );
}
