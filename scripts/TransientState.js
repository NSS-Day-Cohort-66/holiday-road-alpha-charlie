let transientState = {
    parkId: 0,
    eateryId: 0,
    attractionId: 0
}

export const setParkChoice = (chosenPark) => {
    transientState.parkId = chosenPark
    console.log(transientState)
}
export const setEateryChoice = (chosenEatery) => {
    transientState.eateryId = chosenEatery
    console.log(transientState)
}
export const setAttractionChoice = (chosenAttraction) => {
    transientState.attractionId = chosenAttraction
    console.log(transientState)
}
