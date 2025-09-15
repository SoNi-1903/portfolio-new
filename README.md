# Somov Production — Next.js 14 (App Router) + Tailwind

## Запуск локально
```bash
npm i
npm run dev
# прод
npm run build && npm start
```

## Деплой на Vercel
- Подключите репозиторий GitHub и создайте новый проект в Vercel.
- Build Command: `next build` (по умолчанию)
- Output: `.next` (по умолчанию)
- Node 18+ (по умолчанию у Vercel)
- Мы НЕ используем `experimental.optimizeCss`, значит пакет `critters` не требуется.

## Структура
- `app/page.tsx` — весь контент.
- `app/layout.tsx`, `app/globals.css` — оболочка и глобальные стили.
- `app/not-found.tsx`, `app/error.tsx` — корректная генерация /404 и /500.
- `public/hero.jpg` — фото на главной.
- `tailwind.config.ts`, `postcss.config.js` — Tailwind.
- `next.config.mjs`, `tsconfig.json` — конфиги.

## Где править контакты и ссылки
В `app/page.tsx` вверху есть константы:
```ts
const TELEGRAM = "https://t.me/Somov2k03";
const TELEGRAM_REVIEWS_URL = "https://t.me/potfolio_Somov/5";
const TELEGRAM_PORTFOLIO_DESIGN = "https://t.me/portfolio_design_Somov";
const TELEGRAM_PORTFOLIO_VIDEO = "https://t.me/portfolio_reels_Somov";
```
