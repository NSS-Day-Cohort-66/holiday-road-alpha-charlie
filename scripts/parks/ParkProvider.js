export const displayParksList = () => {
  let html = `<select class="park" id="parks_dropdown">
    <option value="0">Park Options...</option>`;

  html += `</select>`;
  return html;
};
