import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://f0ain.dev',
  integrations: [tailwind()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // カスタム言語の追加
      // 注：Shikiには.astroを含む無数の言語が内蔵されています。
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // 水平スクロールを防ぐために文字の折り返しを有効にする
      wrap: true,
    },
  }
});
