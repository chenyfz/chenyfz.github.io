import { resolve } from 'node:path';
import type { APIRoute } from 'astro';
import { openSync, type Font } from 'fontkit';
import sharp from 'sharp';
import { getLocaleStaticPaths, requireLocaleParam } from '@/i18n/config';
import { SHARE_IMAGE, SITE_META } from '@/i18n/site';

export const getStaticPaths = getLocaleStaticPaths;

// Outlined text avoids system fonts and Fontconfig; nothing runs in the browser.
const font = openSync(resolve('public/fonts/OPPO Sans 4.0.ttf')) as Font;

export const GET: APIRoute = async ({ params }) => {
  const lang = requireLocaleParam(params.lang);
  const copy = SITE_META[lang];
  const text = (value: string, size: number, color: string, left: number, top: number) => {
    const run = font.layout(value);
    const scale = size / font.unitsPerEm;
    let x = 0;
    const paths = run.glyphs.map((glyph, index) => {
      if (!glyph.id) throw new Error(`Missing share-image glyph in: ${value}`);
      const position = run.positions[index];
      const path = `<path transform="translate(${x + position.xOffset} ${position.yOffset})" d="${glyph.path.toSVG()}"/>`;
      x += position.xAdvance;
      return path;
    }).join('');
    if (left + x * scale > SHARE_IMAGE.width - 72) throw new Error(`Share-image text overflows: ${value}`);
    return `<g fill="${color}" transform="translate(${left} ${top + run.bbox.maxY * scale}) scale(${scale} ${-scale})">${paths}</g>`;
  };
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SHARE_IMAGE.width}" height="${SHARE_IMAGE.height}">
    <rect width="1200" height="630" fill="#0b1118"/>
    <circle cx="82" cy="86" r="6" fill="#fbbf24"/>
    <path d="M72 452H1128" stroke="#33404b"/>
    <path d="M1032 164h96v96M1128 164l-96 96" fill="none" stroke="#fbbf24" stroke-width="3"/>
  ${[
    text(copy.label, 23, '#fbbf24', 108, 72),
    text(copy.name, lang === 'zh' ? 104 : 88, '#e6edf3', 72, 192),
    text(lang === 'zh' ? 'Chen Yangfan' : '陈扬帆', 30, '#aab6c2', 76, 324),
    text(copy.focus, lang === 'zh' ? 30 : 26, '#e6edf3', 72, 394),
    text('chenyfz.github.io', 26, '#aab6c2', 72, 518),
    text(lang === 'zh' ? '中文 / EN' : 'EN / 中文', 22, '#aab6c2', 984, 522)
  ].join('')}</svg>`);
  const image = await sharp(svg).png().toBuffer();
  return new Response(new Uint8Array(image), { headers: { 'Content-Type': 'image/png' } });
};
