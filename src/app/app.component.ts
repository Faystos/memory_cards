import { Component, OnInit } from '@angular/core';
import { Scene, Game, Types, AUTO, Utils } from 'phaser';
import { getCardPositions } from './shared/util';
import { CONSTANTS } from './shared/constants';
import { Card } from './shared/card';
import { PositionInterface } from './shared/types';

class NewScene extends Scene {
  cardsNumer: number[] = [1, 2, 3, 4, 5];
  constructor() {
    super('Game');
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
    const cards: Card[] = [];
    const positions: PositionInterface[] = Utils.Array.Shuffle(
      getCardPositions(
        +this.sys.game.config.width,
        +this.sys.game.config.height
      )
    );

    this.cardsNumer.forEach((number) => {
      for (let i = 0; i < 2; i++) {
        cards.push(new Card(this, positions.pop(), number, 'card'));
      }
    });
  };

  onOpenCard = (pointer: any, card: Card) => {
    card.onOpenCard();
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  phaserGame!: Game;
  config!: Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: AUTO,
      scene: [NewScene],
      width: CONSTANTS.width,
      height: CONSTANTS.height,
    };
  }

  ngOnInit(): void {
    this.phaserGame = new Game(this.config);
  }
}
