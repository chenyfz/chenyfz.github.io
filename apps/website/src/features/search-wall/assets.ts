// Stable order; these are interface screenshots, not a count of projects.
// Original PNG dimensions reserve the correct space before lazy images load.
const heights = [1461, 1248, 990, 804, 1134, 1116, 780, 1683, 1428, 1167, 702, 1158, 864, 2448, 789, 1077, 906, 645, 801, 1872, 1341, 1311, 1269, 939, 1317, 1482, 600, 804, 1311, 855, 1701, 2103, 804, 1227, 1404, 2439, 1311, 669, 1305, 1245, 1161, 693, 546, 1128, 1125, 546, 1155, 1524, 1755, 1212, 1302, 1383, 1227, 1017, 978, 1047, 1275, 1494, 1161, 1122, 972, 789, 921, 1365, 735, 1338, 1278, 864, 1125, 1398];
export const SERVICE_IMAGES = heights.map((height, index) => {
  const id = String(index + 1).padStart(3, '0');
  return {
    id,
    width: 1242,
    height,
    src: `/search/services/service-${id}.png`,
    thumbnail: `/search/thumbnails/service-${id}.webp`
  };
});
export type ServiceImage = (typeof SERVICE_IMAGES)[number];

let wallImages: ServiceImage[] | undefined;

/** Shuffle once per page session; reopening and language changes keep the same wall. */
export function getServiceWallImages(): ServiceImage[] {
  if (!wallImages) {
    wallImages = [...SERVICE_IMAGES];
    for (let i = wallImages.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [wallImages[i], wallImages[j]] = [wallImages[j], wallImages[i]];
    }
  }
  return wallImages;
}
