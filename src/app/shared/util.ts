import { CONSTANTS } from "./constants";
import { PositionInterface } from "./types";

export const getCardPositions = (width: number, height: number): PositionInterface[] => {
  const offsetX = (width - CONSTANTS.cardWidth * CONSTANTS.cols) / 2;
  const offsetY = (height - CONSTANTS.cardHeight * CONSTANTS.rows) / 2;
  return calculationPosition(CONSTANTS.rows, CONSTANTS.cols, CONSTANTS.cardWidth, CONSTANTS.cardHeight, offsetX,offsetY);
};

const calculationPosition = (rows: number, cols: number, cardWidth: number, cardHeight: number, offsetX: number, offsetY: number): PositionInterface[] => {
  const positions: PositionInterface[] = [];
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          positions.push({
              x: offsetX + col * cardWidth,
              y: offsetY + row * cardHeight
          });
      }
  }
  return positions;
};
