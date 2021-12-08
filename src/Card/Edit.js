import { updateCard, readCard, readDeck } from "../utils/api";
import { useHistory, useParams, Link } from "react-router-dom";
import React, {useEffect, useState} from "react"
import CardForm from "./Form";

function CardEdit({ title }) {
    let { cardId, deckId } = useParams();
    let history = useHistory();
    
    let [card, setCard] = useState({ front: "", back: "" });
    let [deck, setDeck] = useState({ cards: [] });

    useEffect(() => {
        readDeck(deckId).then(setDeck);
        readCard(cardId).then(setCard);
    }, [deckId, cardId])

    function submitHandler(card) {
        updateCard(card).then(doneHandler);
    }

    function doneHandler() {
        history.push(`/decks/${deck.id}`)
    }

    var paul = card.id ?  (
        <CardForm 
            onSubmit={submitHandler}
            onDone={doneHandler}
            initialState={card}
            deckName={deck.name}
            doneBtnLabel="Cancel"
            title="Edit"
            // utility='Edit'
        />
    ) : (
        <p>Loading...</p>
    )

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" /> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            {paul}
        </div> 
    )
}

export default CardEdit;