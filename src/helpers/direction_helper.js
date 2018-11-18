export const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

export function directionToCoordinates(direction) {
  switch (direction) {
    case DIRECTION.UP:
      return { x: 0, y: -1 };
    case DIRECTION.RIGHT:
      return { x: 1, y: 0 };
    case DIRECTION.DOWN:
      return { x: 0, y: 1 };
    case DIRECTION.LEFT:
      return { x: -1, y: 0 };
    default:
      throw new Error(`unknown direction ${direction}`);
  }
}
