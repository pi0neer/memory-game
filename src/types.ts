export type CardImage =
  | 'nginx.svg'
  | 'idk.svg'
  | 'ts.svg'
  | 'react.svg'
  | 'webstorm.svg'
  | 'redux.svg'
  | 'nodejs.svg'
  | 'webpack.svg';

export interface Card {
  id: number;
  img: CardImage;
  open: boolean;
  found: boolean;
}

export interface CardProps extends Card {
  onCardClick: (id: number) => void;
}

export interface ModalProps {
  success: boolean;
  movesAmount: number;
  onButtonClick: () => void;
}
