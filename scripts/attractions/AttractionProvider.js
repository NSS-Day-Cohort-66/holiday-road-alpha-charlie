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
  
      let detailsHtml = `
        <div>
          <h4>Attraction Preview</h4>
          <p>${attractionName}</p>
          <article><div><button class="details">Details</button></div></article>
        </div>`;
  
      const parentTag = document.querySelector(".Preview_attraction");
      parentTag.innerHTML = detailsHtml;
    }
  });