import { resolve } from 'node:path';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { SERVICE_IMAGES } from '@/features/search-wall/assets';

export function getStaticPaths() {
  return SERVICE_IMAGES.map(image => ({ params: { image: `service-${image.id}` }, props: { src: image.src } }));
}

export const GET: APIRoute = async ({ props }) => {
  const image = await sharp(resolve('public', `.${props.src}`))
    .resize({ width: 640, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  return new Response(new Uint8Array(image), { headers: { 'Content-Type': 'image/webp' } });
};
