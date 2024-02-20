import React, { FC } from 'react';
import '@/Components/Card/Card.css';
import { CardProps } from '@/types';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Card: FC<CardProps> = ({ id, img, open, found, onCardClick }) => {
  return (
    <div onClick={() => onCardClick(id)} className={classNames('card', open ? 'open' : 'closed', found && 'found')}>
      {open && <img className="logo" src={require(`@/images/game/${img}`)} alt="game image" />}
    </div>
  );
};
