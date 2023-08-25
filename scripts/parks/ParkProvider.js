export const displayParksList = () => {
  let html = `<select data-type="parks" class="park" id="parks_dropdown">
    <option value="0">Park Options...</option>`;

  html += `</select>`;
  return html;
};

document.addEventListener("change", (changeEvent) => {
  const selectElement = changeEvent.target;

  if (selectElement.dataset.type === "parks") {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const parkName = selectedOption.dataset.park;

    let detailsHtml = `
      <div>
        <h4>Eatery Preview</h4>
        <p>${parkName}</p>
        <article><div><button class="details">Details</button></div></article>
      </div>`;

    const parentTag = document.querySelector(".Preview_park");
    parentTag.innerHTML = detailsHtml;
  }
});