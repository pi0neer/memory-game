import React, { FC } from 'react';
import '@/Components/Modal/Modal.css';
import { ModalProps } from '@/types';

export const Modal: FC<ModalProps> = ({ success, onButtonClick, movesAmount }) => {
  return (
    <dialog className="modal">
      {success ? (
        <p>
          Hurray, you win!
          <br />
          It took {movesAmount} moves!
        </p>
      ) : (
        <p>
          You have lost
          <br />
          You&apos;ve run out of moves
        </p>
      )}
      <button onClick={onButtonClick}>Play again</button>
    </dialog>
  );
};
