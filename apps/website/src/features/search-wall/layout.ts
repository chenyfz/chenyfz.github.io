export type LoadedImage = {
  image: HTMLImageElement;
  ratio: number;
};

type ColumnItem = {
  image: LoadedImage;
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
export function buildColumnLayout(images: LoadedImage[], viewportWidth: number): WallLayout {
  if (images.length === 0 || viewportWidth <= 0) {
    return { columns: [], worldWidth: Math.max(1, viewportWidth) };
  }

  const isDesktop = viewportWidth >= 1024;
  const desiredColumnWidth = isDesktop ? 340 : clamp(viewportWidth / 3.1, 170, 300);
  const columnCount = isDesktop
    ? 3
    : clamp(Math.round((viewportWidth + TILE_GAP) / (desiredColumnWidth + TILE_GAP)), 2, 4);
  const columnWidth = isDesktop
    ? desiredColumnWidth
    : (viewportWidth - TILE_GAP * (columnCount - 1)) / columnCount;

  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
  let step = 9;
  while (gcd(step, images.length) !== 1) step += 1;
  const columns: ColumnLayout[] = [];

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    const items: ColumnItem[] = [];
    let y = 0;
    const offset = (columnIndex * 7) % images.length;

    for (let i = 0; i < images.length; i += 1) {
      const imageIndex = (offset + i * step) % images.length;
      const image = images[imageIndex];
      const height = columnWidth / Math.max(0.001, image.ratio);
      items.push({ image, y, height });
      y += height + TILE_GAP;
    }

    const period = Math.max(1, y);
    const phase = (columnIndex * 0.173 + 0.07) % 1;

    columns.push({
      x: columnIndex * (columnWidth + TILE_GAP),
      width: columnWidth,
      period,
      phase: period * phase,
      items
    });
  }

  return {
    columns,
    worldWidth: columnCount * (columnWidth + TILE_GAP)
  };
}
