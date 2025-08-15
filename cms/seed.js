// cms/seed.js
// Run: SANITY_AUTH_TOKEN=... node seed.js --project og6hntl9 --dataset prod2025
import {createClient} from '@sanity/client';

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : (process.env[name.toUpperCase()] || def);
}

const projectId = arg('project', 'og6hntl9');
const dataset   = arg('dataset', 'prod2025');
const token     = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error('ERROR: please set SANITY_AUTH_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2023-08-01',
  useCdn: false,
});

const L = (ru, en, ka='') => ({ru, en, ka});

async function upsert(id, type, set) {
  await client.createIfNotExists({_id:id, _type:type});
  await client.patch(id).set(set).commit();
}

async function run() {
  // ── siteSettings (singleton)
  await upsert('siteSettings-singleton', 'siteSettings', {
    nav: {
      services: L('Что мы делаем','Services','სერვისები'),
      work:     L('Портфолио','Portfolio','პორტფოლიო'),
      pricing:  L('Тарифы','Pricing','ტარიფები'),
      location: L('Локация','Location','ლოკაცია'),
      contact:  L('Контакты','Contacts','კონტაქტი'),
      book:     L('Забронировать','Book now','დაჯავშნა'),
    },
    ui: {
      pricingNote: L(
        'Цены ориентировочные и зависят от задач. Запросите точную смету.',
        'Prices are indicative; ask for an exact quote.',
        'ფასები სადემონსტრაციოა; მოითხოვეთ ბიუჯეტი.'
      ),
      portfolioLead: L(
        'Примеры работ: подкасты, шоу, прямые эфиры, запись вокала.',
        'Sample work: podcasts, shows, live, vocal.',
        'მაგალითები: პოდკასტები, შოუები, ლაივები, ვოკალი.'
      ),
      form: {
        namePh:  L('Как к вам обращаться','Your name','სახელი'),
        phonePh: L('+995 ...','+995 ...','+995 ...'),
        interestLabel: L('Интересует','Interest','ინტერესი'),
        msgLabel: L('Сообщение','Message','შეტყობინება'),
        msgPh:   L('Коротко опишите задачу','Briefly describe your project','მოკლედ აღწერეთ ამოცანა'),
        submit:  L('Забронировать','Book','დაჯავშნა'),
        options: [
          L('Аренда студии','Studio rent','სტუდიის ქირა'),
          L('Запись подкаста','Podcast recording','პოდკასტის ჩაწერა'),
          L('Подкаст «под ключ»','Turnkey podcast','Turnkey პოდკასტი'),
          L('Vocal Reels','Vocal Reels','Vocal Reels'),
          L('Другое','Other','სხვა'),
        ]
      }
    },
    address: L(
      'Батуми, Грибоедова 21, 3 этаж',
      'Batumi, 21 Griboedov St, 3rd floor',
      'ბათუმი, გრიბოედოვის 21, 3 სართული'
    ),
    email: 'hello@diom.production',
    phone: '+995 5XX XXX XXX',
    instagram: 'https://www.instagram.com/diom_production/',
    // logo — загрузишь в Studio; фронт возьмёт urlFor(logo)
  });

  // ── hero
  await upsert('hero-singleton', 'hero', {
    badge:    L('Профессиональная аудио/видео студия','Professional audio/video studio','პროფესიონალური აუდიო/ვიდეო სტუდია'),
    h1a:      L('Подкасты, съёмки и ','Podcasts, shoots and ','პოდკასტები, გადაღებები და '),
    h1b:      L('полный цикл','full-cycle','სრული ციკლი'),
    h1c:      L(' продакшена',' production',' წარმოება'),
    paragraph:L(
      'Diom Production — студия аудио-видео подкастов. Запишем и смонтируем ваш подкаст, предоставим студию или сделаем «под ключ».',
      'Diom Production — audio-video podcast studio. Record and edit your podcast, rent the studio, or get a turnkey service.',
      'Diom Production — აუდიო-ვიდეო პოდკასტების სტუდია. ჩაიწერეთ და დამონტაჟეთ თქვენი პოდკასტი, იქირავეთ სტუდია ან მიიღეთ turnkey მომსახურება.'
    ),
    b1: L('• Звукорежиссёр на смене','• On-site sound engineer','• საიტზე რეჟისორი'),
    b2: L('• 4K-видео по запросу','• 4K on request','• 4K მოთხოვნით'),
    b3: L('• Вертикальные клипы','• Vertical clips','• ვერტიკალური კლიპები'),
    youtubeId: '3dD_8ztcwto'
  });

  // ── services (3)
  const services = [
    {
      _id:'service-1',
      title:   L('Подкасты','Podcasts','პოდკასტები'),
      bullets: [L('Подготовка и сетап','Prep & setup','მომზადება და სეტაპი'),
                L('Аудио/видео запись','Audio/video recording','აუდიო/ვიდეო ჩამწერი'),
                L('Монтаж, графика и титры','Editing, graphics & titles','მონტაჟი, გრაფიკა და ტიტრები')],
    },
    {
      _id:'service-2',
      title:   L('Запись вокала','Vocal recording','ვოკალის ჩაწერა'),
      bullets: [L('YouTube / Reels / Shorts','YouTube / Reels / Shorts','YouTube / Reels / Shorts'),
                L('Мультикамерная съёмка','Multi-camera shooting','მულტი-კამერა გადაღება'),
                L('Сведение, быстрая публикация','Mixing, quick publish','მიქსი, სწრაფი პუბლიკაცია')],
    },
    {
      _id:'service-3',
      title:   L('Трансляции с вашей локации','On-site live streaming','ლაივები თქვენი ლოკაციიდან'),
      bullets: [L('Мобильный стрим-сетап','Mobile streaming setup','მობილური სტრიმ-სეტაპი'),
                L('Несколько камер и графика','Multi-cam with graphics','რამდენიმე კამერა და გრაფიკა'),
                L('Чат и модерация','Chat & moderation','ჩატი და მოდერაცია')],
    },
  ];
  for (const s of services) await upsert(s._id, 'service', s);

  // ── vocalOffer
  await upsert('vocalOffer-singleton', 'vocalOffer', {
    title:     L('Спецпредложение для вокалистов','Special offer for vocalists','სპეც შეთავაზება მომღერლებისთვის'),
    paragraph: L('Готовое видео: запись вокала + сведение + съёмка вертикального формата.',
                 'Finished video: vocal recording + mixing + vertical shoot.',
                 'მზად ვიდეო: ვოკალის ჩაწერა + მიქსი + ვერტიკალური გადაღება.'),
    bullets: [
      L('Готовое видео для YouTube в 4K','Finished 4K video for YouTube','მზად 4K ვიდეო YouTube-ისთვის'),
      L('Нарезка 2–3 рилс на базе готового видео','2–3 reels cut from final video','2–3 რილსი მზად ვიდეოდან'),
      L('Два ракурса + тайминг под бит','Two angles + beat-timed','ორი კუთხე + ბიტზე გათანაბრება'),
    ],
    cta1: L('Записаться','Book','ჩაწერა'),
    cta2: L('Тарифы','Pricing','ტარიფები'),
    priceNote: L('300 лари «под ключ»: включает 1 час в студии и сведение одного трека.',
                 '300 GEL turnkey: includes 1 hour in studio and one track mixing.',
                 '300 ლარი turnkey: მოიცავს 1 საათს სტუდიაში და ერთი ტრეკის მიქსს.'),
    instagramId: 'DD9noDkI0YL'
  });

  // ── portfolio (4)
  const pf = [
    {_id:'pf-1', _type:'portfolioitem', kind:'youtube',   videoId:'drGxjSkI3UQ', title:L('Подкаст YouTube','Podcast YouTube','YouTube პოდკასტი'), ratio:'16:9'},
    {_id:'pf-2', _type:'portfolioitem', kind:'youtube',   videoId:'3dD_8ztcwto', title:L('YouTube Шоу','YouTube Show','YouTube შოუ'),          ratio:'16:9'},
    {_id:'pf-3', _type:'portfolioitem', kind:'youtube',   videoId:'5qap5aO4i9A', title:L('Прямая трансляция','Live stream','ლაივ სტრიმი'),   ratio:'16:9'},
    {_id:'pf-4', _type:'portfolioitem', kind:'instagram', videoId:'DD9noDkI0YL', title:L('Запись вокала','Vocal recording','ვოკალის ჩაწერა'), ratio:'3:4'},
  ];
  for (const d of pf) await client.createOrReplace(d);

  // ── pricing (6)
  const prices = [
    {_id:'price-1', _type:'pricingCard', title:L('Аренда для самостоятельных съёмок','Studio rent (self-shoot)','სტუდიის ქირა (თვითგადაღება)'), price:L('от 60 лари/час','from 60 GEL/hr','60 ლარიდან/სთ'), features:[L('Базовый свет','Basic lights','საბაზისო შუქი'),L('Фоны','Backdrops','ფონი'),L('2 микрофона + рекордер','2 mics + recorder','2 მიკროფონი + ჩამწერი'),L('Помощь ассистента','Assistant help','ასისტენტი')]},
    {_id:'price-2', _type:'pricingCard', title:L('Стриминг/трансляция','Streaming / live','სტრიმინგი/ტრანსლაცია'), price:L('от 140 лари/час','from 140 GEL/hr','140 ლარიდან/სთ'), features:[L('Мультикамерный стрим','Multi-cam','მულტი-კამერა'),L('Графика/титры','Graphics/titles','გრაფიკა/ტიტრები'),L('Чат/RTMP','Chat/RTMP','ჩატი/RTMP'),L('Техподдержка','Tech support','ტეხ. მხარდაჭერა')]},
    {_id:'price-3', _type:'pricingCard', title:L('Съёмка видео','Video shooting','ვიდეო გადაღება'), price:L('от 130 лари/час','from 130 GEL/hr','130 ლარიდან/სთ'), features:[L('Оператор','Operator','ოპერატორი'),L('Свет','Lights','შუქი'),L('Фон/локация','Backdrop/location','ფონ/ლოკაცია'),L('Передача материала','Footage handoff','მასალის გადაცემა')]},
    {_id:'price-4', _type:'pricingCard', title:L('Съёмка и монтаж','Shooting + editing','გადაღება + მონტაჟი'), price:L('от 200 лари/час','from 200 GEL/hr','200 ლარიდან/სთ'), features:[L('Оператор','Operator','ოპერატორი'),L('Монтаж','Editing','მონტაჟი'),L('Базовая графика','Basic graphics','საბაზისო გრაფიკა'),L('Экспорт 4K','4K export','4K ექსპორტი')]},
    {_id:'price-5', _type:'pricingCard', title:L('Съёмка и запись вокала «под ключ»','Vocal “turnkey”','ვოკალი “turnkey”'), price:L('300 лари/час','300 GEL/hr','300 ლარი/სთ'), features:[L('Запись вокала','Vocal recording','ვოკალის ჩაწერა'),L('Сведение одного трека','One-track mixing','ერთი ტრეკის მიქსი'),L('Съёмка','Shooting','გადაღება'),L('4K экспорт','4K export','4K ექსპორტი')]},
    {_id:'price-6', _type:'pricingCard', title:L('Выездные трансляции','Outside broadcasts','გარე ტრანსლაციები'), price:L('от $500/смена','from $500/day','$500-დან/ცვლა'), features:[L('Мобильный кейс','Mobile case','მობილური ქეისი'),L('Несколько камер','Multi-cam','რამდენიმე კამერა'),L('Графика и чат','Graphics & chat','გრაფიკა და ჩატი'),L('Тех. команда','Tech crew','გუნდი')]},
  ];
  for (const p of prices) await client.createOrReplace(p);

  // ── location (пустые элементы, фото загрузишь в Studio)
  for (let i=1;i<=5;i++){
    await upsert(`loc-${i}`, 'locationImage', { /* photo: upload via Studio */ });
  }

  console.log('✔ Seed finished for', {projectId, dataset});
}

run().catch((e)=>{ console.error(e); process.exit(1); });