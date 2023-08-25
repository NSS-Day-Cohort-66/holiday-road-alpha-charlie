export const displayEateriesList = async () => {
  const response = await fetch("http://holidayroad.nss.team/eateries");
  const eateries = await response.json();

  let html = `<select data-type="eatery" class="eatery" id="eateries_dropdown">
  <option value="0">Tasty Eatery Options...</option>`;
  const divStringArray = eateries.map((eat) => {
      if (eat.ameneties.wheelchairAccessible === true) {
          return `
          <option data-eats="${eat.businessName}" value=${eat.id}> ${eat.businessName}`;
      }
          
      });
  html += divStringArray.join("");
  html += `</select>`;
  return html;
};

document.addEventListener("change", (changeEvent) => {
  const selectElement = changeEvent.target;

  if (selectElement.dataset.type === "eatery") {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const eateryName = selectedOption.dataset.eats;
    const eateryId = selectedOption.value; //added by daniel


    let detailsHtml = `
      <div>
        <h4>Eatery Preview</h4>
        <p>${eateryName}</p>
        <button class="details-button" data-eatery-id="${eateryId}">Details</button> 
      </div>`;

    const parentTag = document.querySelector(".Preview_eat");
    parentTag.innerHTML = detailsHtml;
  }
});

document.addEventListener("click", async (clickEvent) => {
  const detailsButton = clickEvent.target.closest(".details-button");
  if (detailsButton) {
    const eateryId = detailsButton.getAttribute("data-eatery-id");
    //const detailsContainer = detailsButton.nextElementSibling;

    // Fetch the eateries list again
    const response = await fetch("http://holidayroad.nss.team/eateries");
    const eateries = await response.json();

    // Find the selected eatery using the eateryId
    const selectedEatery = eateries.find(eatery => eatery.id === parseInt(eateryId));

    // Generate the HTML for eatery details in a similar format
    let detailsHtml = `
      <h4>Eatery Details</h4>
      <p>Name: ${selectedEatery.businessName}</p>
      <p>Description: ${selectedEatery.description}</p>
      <p>Location: ${selectedEatery.city}, ${selectedEatery.state}</p>
      <p>Wheelchair Accessible: ${selectedEatery.ameneties.wheelchairAccessible ? "Yes" : "No"}</p>
      <p>Wi-Fi: ${selectedEatery.ameneties.wifi ? "Available" : "Not Available"}</p>
      <p>...</p>`;

    // Display the eatery details
    const parentTag = document.querySelector(".details-button");
    parentTag.innerHTML = detailsHtml;
  }
});