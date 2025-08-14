# Diom Production — Web + Sanity CMS (monorepo)

## Структура
- `web/` — Vite + React (сайт, читает контент из Sanity; есть фоллбек на мок-данные)
- `cms/` — Sanity Studio (админка)
- `scripts/seed/seed.ndjson` — стартовые документы для импорта в Sanity

## Быстрый старт (локально)
1. Установите Node.js 18+ (LTS).
2. В одной вкладке терминала:
   ```bash
   cd cms
   npm i
   npm run dev    # Studio на http://localhost:3333
   ```
3. Во второй вкладке:
   ```bash
   cd web
   cp .env.sample .env   # впишите PROJECT_ID и DATASET
   npm i
   npm run dev           # сайт на http://localhost:5173
   ```

## Инициализация Sanity (один раз)
```bash
npm create sanity@latest
# Если студия уже создана в ./cms, просто в sanity.config.ts замените projectId
cd cms
npx sanity dataset import ../scripts/seed/seed.ndjson production
```

## Vercel (монорепо)
Создайте два проекта в Vercel:
- **diom-web**: Root Directory — `web`, Build Command — `npm run build`, Output — `dist`
- **diom-cms**: Root Directory — `cms`, Build Command — `sanity build`, Output — `.sanity`

В `web/.env` укажите данные Sanity (в Vercel → Project → Settings → Environment Variables).

## Где править контент
- Портфолио: коллекция `portfolioItem`
- Локация: коллекция `locationImage` (загружайте вертикальные фото 9:16)
- Сервисы, Тарифы, Спецпредложение: одноимённые коллекции
- Контакты/инста/логотип — `siteSettings`
