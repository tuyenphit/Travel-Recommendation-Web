let destinations = [];
let filtered = [];

async function loadData() {
  const res = await fetch("Travel Recommendation Web.json");
  destinations = await res.json();
  filtered = destinations;
  renderCards(filtered);
}

function renderCards(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  list.forEach((d, index) => {
    results.innerHTML += `
      <div class="card">
        <img src="${d.image}">
        <div class="card-content">
          <h3>${d.name}</h3>
          <p>${d.country}</p>
          <p>${d.description}</p>
          <button onclick="showDetails(${index})">Learn More</button>
        </div>
      </div>
    `;
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
  );
  renderCards(filtered);
});

function filterByCategory(cat) {
  filtered =
    cat === "All"
      ? destinations
      : destinations.filter((d) => d.category === cat);
  renderCards(filtered);
}

function showDetails(index) {
  const d = filtered[index];
  document.getElementById("modalBody").innerHTML = `
    <img src="${d.image}" style="width:100%">
    <h2>${d.name}, ${d.country}</h2>
    <p>${d.details}</p>
    <p><b>Best time:</b> ${d.best_time}</p>
    <p><b>Top attractions:</b> ${d.top_attractions.join(", ")}</p>
  `;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function scrollToExplore() {
  document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
}

loadData();
