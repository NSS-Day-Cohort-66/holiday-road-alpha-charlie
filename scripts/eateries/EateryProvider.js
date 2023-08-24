export const displayEateriesList = async () => {
    const response = await fetch("http://holidayroad.nss.team/eateries");
    const eateries = await response.json();
  
    let html = `<select class="eatery" id="eateries_dropdown">
    <option value="0">Tasty Places</option>`;
    const divStringArray = eateries.map((eat) => {
        if (eat.ameneties.wheelchairAccessible === true) {

            return `
            <option value=${eat.id}> ${eat.businessName}`;
        }
    });
    html += divStringArray.join("");
    html += `</select>`;
    return html;
  };