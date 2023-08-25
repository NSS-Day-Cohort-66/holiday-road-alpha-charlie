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
  
      let detailsHtml = `
        <div>
          <h4>Eatery Preview</h4>
          <p>${eateryName}</p>
          <div></div>
        </div>`;
  
      const parentTag = document.querySelector(".Preview_eat");
      parentTag.innerHTML = detailsHtml;
    }
  });