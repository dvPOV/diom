// cms/seed.js
/**
 * Sanity seeder for Diom Production
 * Заполняет: Site Settings, Hero, Services (3шт), Portfolio (4шт), Vocal Offer, Pricing (6шт), Location (вертикальная лента)
 * skzZp2B9kJNchwsFk9KhjGhRSok45nqiO442rjEpOVC46FYssYscHGz62NvJQCYumMJbvrdkYu74cFJ0GdRfynVitZmRFSo3WmoS6c184FT0b0JuszJjczCWIMElwtts7bTQOYXPBWpcJma6NZ4rGdcz36BSbpUOpKLefF7zB7w6tYWdLM7F
 * КОНФИГ: правь при необходимости в TYPE_MAP и DATA_* ниже.
 */

import { createClient } from "@sanity/client";

// ── 1) ПРОЕКТ: заполни при необходимости
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "<YOUR_PROJECT_ID>";
const SANITY_DATASET    = process.env.SANITY_DATASET    || "production";
const SANITY_TOKEN      = process.env.SANITY_TOKEN; // обязателен для записи

if (!SANITY_TOKEN || SANITY_TOKEN.trim() === "") {
  console.error("❌ Не задан SANITY_TOKEN (см. шаг 0). Пример запуска: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=pt_... node seed.js");
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2025-08-01",
  token: SANITY_TOKEN,
  useCdn: false,
});

// ── 2) СООТВЕТСТВИЕ ТИПОВ В ТВОЕЙ СХЕМЕ
// Если в Studio у типов другие machine-names — поменяй здесь:
const TYPE_MAP = {
  siteSettings: "siteSettings",     // singleton
  hero:         "hero",             // singleton
  service:      "service",          // коллекция
  portfolio:    "portfolioitem",        // коллекция (видео-карточки)
  vocalOffer:   "vocalOffer",       // singleton
  pricingItem:  "pricingCard",      // коллекция
  locationItem: "locationImage",     // коллекция (одна вертикальная фотка = один документ)
};

// ── 3) ДАННЫЕ ПО УМОЛЧАНИЮ (можешь править тексты/ID)
const DATA_SETTINGS = {
  _id: "siteSettings-singleton",
  _type: TYPE_MAP.siteSettings,
  siteTitle: "Diom Production",
  instagramUrl: "https://www.instagram.com/diom_production/",
  email: "hello@diom.production",
  phone: "+995 5XX XXX XXX",
  address: "Батуми, Грибоедова 21, 3 этаж",
  howToReachUrl: "https://www.instagram.com/stories/highlights/18305805712240283/",
  logoUrl:
    "https://downloader.disk.yandex.ru/preview/75075899b30462e15f1105f0e9c4382fd62f805672f197761851c69256539b8e/689ce686/onD9G14hNm5ZmnFHgnv6Uc7wfjLqCtnnmyxNGnQe19UnuXViZKnSN-XO6SzY-Y-WizhyM_fJunpXeDnxwDxljA%3D%3D?uid=0&filename=Logo.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=2048x2048",
};

const DATA_HERO = {
  _id: "hero-singleton",
  _type: TYPE_MAP.hero,
  title: "Подкасты, съёмки и полный цикл продакшена",
  subtitle:
    "Diom Production — студия аудио‑видео подкастов. Запишем и смонтируем ваш подкаст, предоставим студию или сделаем «под ключ».",
  provider: "youtube", // youtube | vimeo | instagram
  videoId: "3dD_8ztcwto",
  // опционально — свой thumbnail:
  // thumbUrl: "https://i.ytimg.com/vi/3dD_8ztcwto/hqdefault.jpg",
  badges: ["• Звукорежиссёр на смене", "• 4K‑видео по запросу", "• Вертикальные клипы"],
};

const DATA_SERVICES = [
  {
    _type: TYPE_MAP.service,
    title: "Подкасты",
    bullets: ["Подготовка и сетап", "Аудио/видео запись", "Монтаж, графика и титры"],
    sortIndex: 1,
  },
  {
    _type: TYPE_MAP.service,
    title: "Запись вокала",
    bullets: ["YouTube / Reels / Shorts", "Мультикамерная съемка", "Сведение, быстрая публикация"],
    sortIndex: 2,
  },
  {
    _type: TYPE_MAP.service,
    title: "Трансляции с вашей локации",
    bullets: ["Мобильный стрим‑сетап", "Несколько камер и графика", "Чат и модерация"],
    sortIndex: 3,
  },
];

const DATA_VOCAL_OFFER = {
  _id: "vocalOffer-singleton",
  _type: TYPE_MAP.vocalOffer,
  title: "Спецпредложение для вокалистов",
  description: "Готовое видео: запись вокала + сведение + вертикальная съёмка.",
  bullets: ["Готовое 4K видео для YouTube", "Нарезка 2–3 рилс на базе готового видео", "Два ракурса + тайминг под бит"],
  priceNote: "300 лари «под ключ»: включает 1 час в студии и сведение одного трека.",
  provider: "instagram",
  videoId: "DD9noDkI0YL",
  ratio: "3:4",
};

const DATA_PORTFOLIO = [
  { _type: TYPE_MAP.portfolio, provider: "youtube",   videoId: "drGxjSkI3UQ", title: "Подкаст YouTube", sortIndex: 1 },
  { _type: TYPE_MAP.portfolio, provider: "youtube",   videoId: "3dD_8ztcwto", title: "YouTube Шоу",     sortIndex: 2 },
  { _type: TYPE_MAP.portfolio, provider: "youtube",   videoId: "5qap5aO4i9A", title: "Прямая трансляция",sortIndex: 3 },
  { _type: TYPE_MAP.portfolio, provider: "instagram", videoId: "DD9noDkI0YL", title: "Запись вокала",   ratio: "3:4", sortIndex: 4 },
];

const DATA_PRICING = [
  { _type: TYPE_MAP.pricingItem, title: "Аренда для самостоятельных съёмок", price: "от 60 лари/час", features: ["Базовый свет", "Фоны", "2 микрофона + рекордер", "Помощь ассистента"], sortIndex: 1 },
  { _type: TYPE_MAP.pricingItem, title: "Стриминг/трансляция",               price: "от 140 лари/час", features: ["Мультикамерный стрим", "Графика/титры", "Чат/RTMP", "Техподдержка"], sortIndex: 2 },
  { _type: TYPE_MAP.pricingItem, title: "Съёмка видео",                      price: "от 130 лари/час", features: ["Оператор", "Свет", "Фон/локация", "Передача материала"], sortIndex: 3 },
  { _type: TYPE_MAP.pricingItem, title: "Съёмка и монтаж",                   price: "от 200 лари/час", features: ["Оператор", "Монтаж", "Базовая графика", "Экспорт 4K"], sortIndex: 4 },
  { _type: TYPE_MAP.pricingItem, title: "Съёмка и запись вокала «под ключ»", price: "300 лари/час",    features: ["Запись вокала", "Сведение одного трека", "Съёмка", "4K экспорт"], sortIndex: 5 },
  { _type: TYPE_MAP.pricingItem, title: "Выездные трансляции",               price: "от $500/смена",   features: ["Мобильный кейс", "Несколько камер", "Графика и чат", "Тех. команда"], sortIndex: 6 },
];

// Вертикальная лента (9:16). Сейчас — заглушки picsum; потом заменишь через CMS-upload.
const DATA_LOCATION = Array.from({ length: 12 }).map((_, i) => ({
  _type: TYPE_MAP.locationItem,
  title: `Интерьер #${i + 1}`,
  ratio: "9:16",
  imageUrl: `https://picsum.photos/seed/diom-${i + 1}/720/1280`,
  sortIndex: i + 1,
}));

// ── 4) УТИЛИТЫ
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function upsertSingleton(doc) {
  // Для singleton-ов: фиксированный _id без префикса 'drafts.'
  const existing = await client.getDocument(doc._id);
  if (existing) {
    await client.patch(doc._id).set(doc).commit();
    console.log(`✓ Updated ${doc._type} (${doc._id})`);
  } else {
    await client.createIfNotExists(doc);
    console.log(`✓ Created ${doc._type} (${doc._id})`);
  }
}

async function createMany(docs, idPrefix) {
  for (let i = 0; i < docs.length; i++) {
    const d = docs[i];
    const _id = `${idPrefix}-${(d.title || d.videoId || d.imageUrl || i + 1)
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${i + 1}`;
    const payload = { ...d, _id };
    await client.createOrReplace(payload);
    console.log(`+ ${d._type}: ${d.title || d.videoId || d.imageUrl}`);
    // немножко подождём, чтобы не «захлёбывать» бесплатную квоту
    await sleep(80);
  }
}

async function main() {
  console.log("→ Seeding to", SANITY_PROJECT_ID, "/", SANITY_DATASET);

  await upsertSingleton(DATA_SETTINGS);
  await upsertSingleton(DATA_HERO);
  await upsertSingleton(DATA_VOCAL_OFFER);

  await createMany(DATA_SERVICES, "service");
  await createMany(DATA_PORTFOLIO, "portfolio");
  await createMany(DATA_PRICING, "pricing");
  await createMany(DATA_LOCATION, "location");

  console.log("✅ Done. Открой Studio и нажми обновить: http://localhost:3333/");
}

main().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});