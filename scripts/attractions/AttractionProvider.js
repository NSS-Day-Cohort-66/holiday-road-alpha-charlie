export const displayAttractionList = async () => {
    const response = await fetch("http://holidayroad.nss.team/bizarreries");
    const attractions = await response.json();
  
    let html = `<select class="attraction" id="attraction_dropdown">
    <option value="0">Fun Attraction Options...</option>`;
    const divStringArray = attractions.map((attraction) => {
        

            return `
            <option value=${attraction.id}> ${attraction.name}`;
        
    });
    html += divStringArray.join("");
    html += `</select>`;
    return html;
  };