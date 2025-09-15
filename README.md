# Somov Production — Next.js + Tailwind

Готовый к деплою проект (App Router, TypeScript, Tailwind). Адаптивный, с кнопкой «Оставить отзыв в Telegram» и вашим фото на главной.

## Быстрый старт локально
```bash
# установка
pnpm i   # или npm i / yarn
# запуск
pnpm dev # или npm run dev / yarn dev
# откройте http://localhost:3000
```

## Деплой на Vercel
1. Залейте этот репозиторий на GitHub (например, `somov-production`).
2. Войдите в Vercel → **New Project** → **Import Git Repository** → выберите репозиторий.
3. Framework: **Next.js**. Остальное по умолчанию → **Deploy**.

## Где менять контент
- **Ссылки** (Telegram, портфолио, отзывы): верх файла `app/page.tsx`.
- **Фото героя**: замените файл `public/hero.jpg` своим фото (то же имя файла).
- **Секции/услуги/тексты**: массивы `SERVICES` и пр. в `app/page.tsx`.
- **Мета-теги**: `app/layout.tsx` (`metadata`).

## Заметки
- Раздел «Отзывы»: форма скрыта. Кнопка ведёт в Telegram: `TELEGRAM_REVIEWS_URL`.
- Скрипт фоновых «blobs» и анимации оптимизированы (requestAnimationFrame).
- Стек: Next 14, React 18, Tailwind 3, Lucide Icons.
