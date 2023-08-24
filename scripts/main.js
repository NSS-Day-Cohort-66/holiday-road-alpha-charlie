import { displayAttractionList } from "./attractions/AttractionProvider.js";
import { displayEateriesList } from "./eateries/EateryProvider.js";
import { displayParksList } from "./parks/ParkProvider.js";

const mainContainer = document.querySelector("#container");

const render = async () => {
  const eatList = await displayEateriesList();
  const attractionList = await displayAttractionList();
  const parkList = displayParksList();

  const composedHTML = `
    <header class="header">
    <img src="data:image/jpeg;base64,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" class="logo" />
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
    <aside class ="it">
    <h3>Saved Itineraries</h3>
    
    </aside>
</article>
<article class = "Preview"
    
</article>






    <section class = "button">


    </section>
    
    
    `;
  mainContainer.innerHTML = composedHTML;
};
render();
