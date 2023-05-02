import { Component } from '@angular/core';
import { Scene, Game, Types, AUTO, Utils } from 'phaser';

import { getCardPositions } from './shared/util';
import { CONSTANTS } from './shared/constants';
import { Card } from './shared/card';
import { PositionInterface } from './shared/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends Scene {
  private phaserGame: Game;
  private config: Types.Core.GameConfig = {
    type: AUTO,
    scene: [this],
    width: CONSTANTS.width,
    height: CONSTANTS.height,
  };
  private cardsNumer: number[] = [1, 2, 3, 4, 5];
  private cards!: Card[];
  private openedCard: Card | null = null;

  constructor() {
    super('Game');
    this.phaserGame = new Game(this.config);
  }

  preload = () => {
    this.load.image('background', '../assets/sprites/background.png');
    this.load.image('card', '../assets/sprites/card.png');
    this.load.image('card1', '../assets/sprites/card1.png');
    this.load.image('card2', '../assets/sprites/card2.png');
    this.load.image('card3', '../assets/sprites/card3.png');
    this.load.image('card4', '../assets/sprites/card4.png');
    this.load.image('card5', '../assets/sprites/card5.png');
  };

  create = () => {
    this.renderingBackground();
    this.renderingCards();
    this.input.on('gameobjectdown', this.onOpenCard, this);
  };

  renderingBackground = () => {
    this.add.sprite(1280 / 2, 720 / 2, 'background');
  };

  renderingCards = () => {
    const positions: PositionInterface[] = Utils.Array.Shuffle(
      getCardPositions(
        +this.sys.game.config.width,
        +this.sys.game.config.height
      )
    );

    this.cards = this.initCards(this.cardsNumer, positions);
  };

  onOpenCard = (pointer: any, card: Card) => {
    if (card.isOpenedCard) return;

    if (this.openedCard) {
      if (this.openedCard.nameNumber === card.nameNumber) {
        this.openedCard = null;
      } else {
        this.openedCard.onCloseCard();
        this.openedCard = card;
        console.log('закрываем');
      }
    } else {
      this.openedCard = card;
      console.log('присваиваем');
    }
    card.onOpenCard();
  };

  initCards = (
    cardsNumer: number[],
    positions: PositionInterface[]
  ): Card[] => {
    const cards: Card[] = [];
    cardsNumer.forEach((number) => {
      for (let i = 0; i < 2; i++) {
        cards.push(new Card(this, positions.pop(), number, 'card'));
      }
    });
    return cards;
  };
}
