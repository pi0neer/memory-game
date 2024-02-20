import React, { FC, useEffect } from 'react';
import { Card } from '@/Components/Card/Card';
import { Modal } from '@/Components/Modal/Modal';
import '@/Components/App/App.css';
import { Card as CardInterface, CardImage } from '@/types';

const cardsList: CardImage[] = [
  'nginx.svg',
  'idk.svg',
  'ts.svg',
  'react.svg',
  'webstorm.svg',
  'redux.svg',
  'nodejs.svg',
  'webpack.svg',
];

const initialCards = cardsList.concat(cardsList).map((img, i) => ({
  id: i + 1,
  img: img,
  open: false,
  found: false,
}));

const initialTries = 40;

const preloadImages = (images: CardImage[]) => {
  images.forEach((src) => {
    new Image().src = src;
  });
};

const shuffledCards = () => {
  const shuffled = initialCards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
};

export const App: FC = () => {
  const [gameSuccess, setGameSuccess] = React.useState(false);
  const [displayModal, setModalDisplay] = React.useState(false);
  const [movesAmount, setMovesAmount] = React.useState(0);
  const [triesAmount, setTriesAmount] = React.useState(initialTries);
  const [cards, setCards] = React.useState<CardInterface[]>(() => shuffledCards());
  const [lastClickedCard, setLastClickedCard] = React.useState<number | null>(null);
  const timeoutId = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    preloadImages(cardsList);
  }, []);

  useEffect(() => {
    if (movesAmount !== 0) {
      if (cards.filter((card) => card.found).length === initialCards.length) {
        setGameSuccess(true);
        setModalDisplay(true);
      }
      if (movesAmount === initialTries) {
        setModalDisplay(true);
      }
    }
  }, [cards, movesAmount]);

  const restartGame = () => {
    setGameSuccess(false);
    setModalDisplay(false);
    setMovesAmount(0);
    setTriesAmount(initialTries);
    setCards(shuffledCards());
    setLastClickedCard(null);
    clearTimeout(timeoutId.current);
  };

  const handleCardClick = (id: number) => {
    const clickedCard = cards.find((card) => card.id === id)!;
    if (id === lastClickedCard || clickedCard.found || clickedCard.open) return;
    const openCards = cards.filter((card) => card.id !== id && card.open)!;
    const clickedCards = [...openCards, clickedCard];
    openCardById(id);
    if (clickedCards.length === 2) {
      countMovesAndTries();
      checkForOverLap(clickedCards);
    }
    if (clickedCards.length > 2) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      const newCards = cards.map((card) => {
        return {
          ...card,
          open: card.id === id,
        };
      });
      setCards(newCards);
    }
    setLastClickedCard(id);
  };

  const checkForOverLap = (clickedCards: CardInterface[]) => {
    if (clickedCards[0].img === clickedCards[1].img) {
      const newCards = cards.map((card) => {
        if (card.id === clickedCards[0].id || card.id === clickedCards[1].id) {
          return {
            ...card,
            found: true,
            open: false,
          };
        }
        return card;
      });
      setCards(newCards);
    } else {
      timeoutId.current = setTimeout(() => {
        closeAllOpenCards();
        setLastClickedCard(null);
      }, 1500);
    }
  };

  const openCardById = (id: number) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          open: true,
        };
      }
      return card;
    });
    setCards(newCards);
  };

  const closeAllOpenCards = () => {
    const newCards = cards.map((card) => ({
      ...card,
      open: false,
    }));
    setCards(newCards);
  };

  const countMovesAndTries = () => {
    if (movesAmount < initialTries) {
      setMovesAmount((movesAmount) => movesAmount + 1);
      setTriesAmount((triesAmount) => triesAmount - 1);
    }
  };

  return (
    <main className="container">
      <h1>MEMORY GAME</h1>
      <section className="game-field">
        <div className="info">
          <p>Moves made</p>
          <p>{movesAmount}</p>
        </div>
        <div className="cards-field">
          {cards.map((card) => {
            return (
              <Card
                found={card.found}
                key={card.id}
                id={card.id}
                open={card.open}
                img={card.img}
                onCardClick={handleCardClick}
              />
            );
          })}
        </div>
        <div className="info">
          <p>Attempts left</p>
          <p>{triesAmount}</p>
        </div>
      </section>
      {displayModal && <Modal success={gameSuccess} movesAmount={movesAmount} onButtonClick={restartGame} />}
    </main>
  );
};
