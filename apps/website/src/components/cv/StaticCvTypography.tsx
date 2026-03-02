import type { Locale } from '@/i18n/config';
import { fontSubsetsManifest } from '@/generated/font-subsets-manifest';

export const staticCvHeadingFontFamilyZh = "'StaticCvOppoSans', \"PingFang SC\", \"Microsoft YaHei\", \"Source Han Sans SC\", \"Noto Sans SC\", sans-serif";
export const staticCvHeadingFontFamilyEn = "'Google Sans', 'Google Sans Text', 'DM Sans', 'Noto Sans', \"PingFang SC\", \"Microsoft YaHei\", \"Source Han Sans SC\", sans-serif";
export const staticCvBodyFontFamilyZh = "'StaticCvFangsong', 'Noto Serif SC', 'Source Han Serif SC', 'STSong', 'SimSun', serif";
export const staticCvBodyFontFamilyEn = "'Newsreader', 'StaticCvFangsong', 'STSong', 'SimSun', 'Iowan Old Style', 'Times New Roman', serif";

export function getStaticCvHeadingFontFamily(lang: Locale): string {
  return lang === 'zh' ? staticCvHeadingFontFamilyZh : staticCvHeadingFontFamilyEn;
}

export function getStaticCvBodyFontFamily(lang: Locale): string {
  return lang === 'zh' ? staticCvBodyFontFamilyZh : staticCvBodyFontFamilyEn;
}

export function StaticCvFontFace({ lang }: { lang: Locale }) {
  const locale = lang === 'zh' ? 'zh' : 'en';
  const subsets = fontSubsetsManifest[locale];

  if (!subsets) {
    return null;
  }

  const oppoSubsetPath = `/fonts/subsets/${subsets.oppoSans400}`;
  const zhuqueSubsetPath = `/fonts/subsets/${subsets.zhuqueFangsong400}`;

  if (locale === 'en') {
    return (
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap');

        @font-face {
          font-family: 'StaticCvFangsong';
          src: url('${zhuqueSubsetPath}') format('woff2'),
               url('/fonts/ZhuqueFangsong-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    );
  }

  return (
    <style>{`
      @font-face {
        font-family: 'StaticCvOppoSans';
        src: url('${oppoSubsetPath}') format('woff2'),
             url('/fonts/OPPO%20Sans%204.0.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'StaticCvFangsong';
        src: url('${zhuqueSubsetPath}') format('woff2'),
             url('/fonts/ZhuqueFangsong-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}</style>
  );
}
