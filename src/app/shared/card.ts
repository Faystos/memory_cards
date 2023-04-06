import { GameObjects, Scene } from 'phaser';
import { PositionInterface } from './types';

export class Card extends GameObjects.Sprite {
  private nameNumber: number;
  public name: string;

  constructor(
    scene: Scene,
    position: PositionInterface | undefined,
    nameNumber: number,
    name: string
  ) {
    super(scene, position!['x'], position!['y'], name);
    this.scene = scene;
    this.nameNumber = nameNumber;
    this.name = name;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.setInteractive();
  }

  public onOpenCard = () => {
    this.setTexture(`${this.name}${this.nameNumber}`);
  };
}
