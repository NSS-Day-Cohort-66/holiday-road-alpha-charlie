export const displayAttractionList = async () => {
  const response = await fetch("http://holidayroad.nss.team/bizarreries");
  const attractions = await response.json();

  let html = `<select data-type="attraction" class="attraction" id="attraction_dropdown">
  <option value="0">Fun Attraction Options...</option>`;
  const divStringArray = attractions.map((attraction) => {
      

          return `
          <option data-name="${attraction.name}" value=${attraction.id}> ${attraction.name}`;
      
  });
  html += divStringArray.join("");
  html += `</select>`;
  return html;
};


document.addEventListener("change", (changeEvent) => {
  const selectElement = changeEvent.target;

  if (selectElement.dataset.type === "attraction") {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const attractionName = selectedOption.dataset.name;
    const attractionId = selectedOption.value
    
    let detailsHtml = `
      <div>
        <h4>Attraction Preview</h4>
        <p>${attractionName}</p>
        <article><div><button class="details" data-attraction-id="${attractionId}">Details</button></div></article>
      </div>`;

    const parentTag = document.querySelector(".Preview_attraction");
    parentTag.innerHTML = detailsHtml;
  }
});

document.addEventListener("click", async (clickEvent) => {
  const detailsButton = clickEvent.target.closest(".details");
  if (detailsButton) {
    const attractId = detailsButton.getAttribute("data-attraction-id");
    

    // Fetch the eateries list again
    const response = await fetch("http://holidayroad.nss.team/bizarreries");
    const attractions = await response.json();

    // Find the selected eatery using the eateryId
    const selectedAttraction = attractions.find(attraction => attraction.id === parseInt(attractId));

    // Generate the HTML for eatery details in a similar format
    let detailsHtml = `
      <h4>Attraction details</h4>
      <p>Name: ${selectedAttraction.name}</p>
      <p>Description: ${selectedAttraction.description}</p>
      <p>Location: ${selectedAttraction.city}, ${selectedAttraction.state}</p>
      <p>...</p>`;

    // Display the  details
    const parentTag = document.querySelector(".details");
    parentTag.innerHTML = detailsHtml;
  }
});