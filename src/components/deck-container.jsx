import { useEffect, useState } from "react";
import DeckCards from "./deckcards";

function DeckContainer({setSelectedDeck, selectedDeck, deckCardList, getDeckCards, selectedHero, setCreateDeck, setDeckCardList, displayDeck, setDisplayDeck}) {
  
  const [deckList, setDeckList] = useState([])
  
  let selectedDeckName = "Add 5 Cards"
                          console.log(selectedDeckName)

  useEffect(() => {
    fetch("http://localhost:9292/decks")
    .then(res => res.json())
    .then(data => setDeckList(data))
  }, [])

  
  const handleClick = (deckName, deckId) => {
    selectedDeckName = deckName
                          console.log(selectedDeckName)
    if(deckId !== selectedDeck){
      setSelectedDeck(deckId)
    }
    setDisplayDeck((value) => value = true)
    getDeckCards(deckId)
  }

  const deleteCardFromDeck = (cardId) => {
    console.log("cardID", cardId)
    fetch(`http://localhost:9292/decks/${selectedDeck}/${cardId}`, {method: "DELETE"})
    .then(console.log("Card Deleted"))
    .then(getDeckCards(selectedDeck))
  }

  const heroSpecificDecks = deckList.filter(deck => deck.hero_id === selectedHero)

  
  return (
      <div className="deck-container">
        <button onClick={()=> !setCreateDeck(false)}>Create New Deck</button>
        <h2>Select A Deck</h2>
        {heroSpecificDecks.map(deck => <button key={deck.id} onClick={() => handleClick(deck.name, deck.id)}>{deck.name}</button>)}
        <br />
        {displayDeck === false ? null : <DeckCards selectedDeckName={selectedDeckName} deleteCardFromDeck={deleteCardFromDeck} deckCardList={deckCardList}/>}
        
      </div>
    );
  }
  
  export default DeckContainer;