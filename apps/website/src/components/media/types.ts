export type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  thumbnailSrc?: string;
  poster?: string;
};
