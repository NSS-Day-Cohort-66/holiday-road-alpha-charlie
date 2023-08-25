export const displayParksList = async () => {
  const wheelChairResponse = await fetch(
    "https://developer.nps.gov/api/v1/amenities/parksplaces?q=%22Wheelchair%20Accessible%22&limit=500&start=0&api_key=fhlPVqRToDHdLIZ2OAHqEbB1CyLHNZGYa5hz2Go2"
  );
  const wheelChairParks = await wheelChairResponse.json();
  const wheelsObj = await wheelChairParks.data[0][0].parks;

  const cellularResponse = await fetch(
    "https://developer.nps.gov/api/v1/amenities/parksplaces?q=%22Cellular%20Signal%22&limit=500&start=0&api_key=fhlPVqRToDHdLIZ2OAHqEbB1CyLHNZGYa5hz2Go2"
  );
  const cellularParks = await cellularResponse.json();
  const cellularObj = await cellularParks.data[0][0].parks;

  const scenicResponse = await fetch(
    "https://developer.nps.gov/api/v1/amenities/parksplaces?q=%22Scenic%20View%2FPhoto%20Spot%22&limit=500&start=0&api_key=fhlPVqRToDHdLIZ2OAHqEbB1CyLHNZGYa5hz2Go2"
  );
  const scenicParks = await scenicResponse.json();
  const scenicObj = await scenicParks.data[0][0].parks;

  const infoResponse = await fetch(
    "https://developer.nps.gov/api/v1/amenities/parksplaces?q=%22Information%20-%20Ranger%2FStaff%20Member%20Present%22&limit=500&start=0&api_key=fhlPVqRToDHdLIZ2OAHqEbB1CyLHNZGYa5hz2Go2"
  );
  const infoParks = await infoResponse.json();
  const infoObj = await infoParks.data[0][0].parks;

  let parksList = [];
  let cellWheelList = [];
  let infoScenicList = [];

  for (const wheelItem of wheelsObj) {
    for (const cellItem of cellularObj) {
      if (cellItem.fullName === wheelItem.fullName) {
        cellWheelList.push(cellItem);
      }
    }
  }

  for (const scenicItem of scenicObj) {
    for (const infoItem of infoObj) {
      if (infoItem.fullName === scenicItem.fullName) {
        infoScenicList.push(infoItem);
      }
    }
  }

  for (const cellWheel of cellWheelList) {
    for (const infoScenic of infoScenicList) {
      if (cellWheel.fullName === infoScenic.fullName) {
        parksList.push(infoScenic);
      }
    }
  }

  let html = `<select data-type="parks" class="park" id="parks_dropdown">
      <option value="0">Park Options...</option>`;

  let parkId = 1;

  const divStringArray = parksList.map((obj) => {
    html += `<option value=${parkId++}>${obj.fullName}</option>`;
  });
  html += divStringArray.join("");

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
