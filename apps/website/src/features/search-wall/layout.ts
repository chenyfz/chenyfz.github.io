export type WallImage = {
  image: HTMLImageElement;
  src: string;
  ratio: number;
};

type ColumnItem = {
  image: WallImage;
  y: number;
  height: number;
};

type ColumnLayout = {
  x: number;
  width: number;
  period: number;
  phase: number;
  items: ColumnItem[];
};

export type WallLayout = {
  columns: ColumnLayout[];
  worldWidth: number;
};

export const TILE_GAP = 8;
export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function buildColumnLayout(images: WallImage[], viewportWidth: number): WallLayout {
  if (images.length === 0 || viewportWidth <= 0) {
    return { columns: [], worldWidth: Math.max(1, viewportWidth) };
  }

  const previewColumns = clamp(Math.round(viewportWidth / 210), viewportWidth < 480 ? 2 : 3, 4);
  const columnWidth = (viewportWidth - TILE_GAP * (previewColumns - 1)) / previewColumns;
  // A wide, shuffled wall avoids repeating the same two or three columns on screen.
  const columnCount = Math.min(images.length, clamp(Math.ceil(images.length / 9), 4, 8));
  const columns = Array.from({ length: columnCount }, (_, columnIndex) => {
    let y = 0;
    const items = images.filter((_, index) => index % columnCount === columnIndex).map(image => {
      const height = columnWidth / image.ratio;
      const item = { image, y, height };
      y += height + TILE_GAP;
      return item;
    });
    return {
      x: columnIndex * (columnWidth + TILE_GAP),
      width: columnWidth,
      period: Math.max(1, y),
      phase: -((columnIndex * 0.382) % 1) * 80,
      items
    };
  });

  return { columns, worldWidth: columnCount * (columnWidth + TILE_GAP) };
}
