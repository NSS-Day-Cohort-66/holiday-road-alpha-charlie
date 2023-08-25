import { displayAttractionList } from "./attractions/AttractionProvider.js";
import { displayEateriesList } from "./eateries/EateryProvider.js";
import { displayParksList } from "./parks/ParkProvider.js";
import { saveButton } from "./saveITbutton.js";

const mainContainer = document.querySelector("#container");

const render = async () => {
  const eatList = await displayEateriesList();
  const attractionList = await displayAttractionList();
  const saveBTN = saveButton();
  const parkList = await displayParksList();

  const composedHTML = `
    <header class = "pic">
    <img src="https://cdn-icons-png.flaticon.com/128/2913/2913520.png" />
    </header>
    <header class="header">
    <h1 class="title">Holiday Road</h1>
</header>
<article class="Dropdowns">
    <section class="parks">
    <h3>Select Park</h3>
    ${parkList}
    </section>
    <section class="attraction">
    <h3>Select Attraction</h3>
    ${attractionList}
    </section>
    <section class="eatery">
    <h3>Select Eatery</h3>
    ${eatList}
    </section>
    <aside class="it">
    <h3>Saved Itineraries</h3>
    
    </aside>
</article>

<h1 class="title">Previewed Selections</h1>
<article id="Preview">

<div class="previewDetails">
    <div class="Preview_park"></div>
    <div class="Preview_attraction"></div>
    <div class="Preview_eat"></div>
  </div>
</article>







<article class = "Savebutton">
${saveBTN}
</article>
    
    
    `;
  mainContainer.innerHTML = composedHTML;
};
render();
