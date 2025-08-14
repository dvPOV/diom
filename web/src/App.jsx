import React, { useEffect, useMemo, useRef, useState } from "react";
import { sanity, hasCMS, urlFor } from './lib/sanityClient';
import { qPortfolio, qLocations, qServices, qPricing, qVocal } from './lib/queries';
import { MOCK } from './mock/content';

const ACCENT = "#9A00FF";
const STICKY_OFFSET = 72;
const LOGO_URL = "https://downloader.disk.yandex.ru/preview/75075899b30462e15f1105f0e9c4382fd62f805672f197761851c69256539b8e/689ce686/onD9G14hNm5ZmnFHgnv6Uc7wfjLqCtnnmyxNGnQe19UnuXViZKnSN-XO6SzY-Y-WizhyM_fJunpXeDnxwDxljA%3D%3D?uid=0&filename=Logo.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=2048x2048";

const I18N = {
  ru: {
    nav:{services:'Что мы делаем', location:'Локация', work:'Портфолио', pricing:'Тарифы', contact:'Контакты', book:'Забронировать'},
    hero:{badge:'Профессиональная аудио/видео студия', h1a:'Подкасты, съёмки и ', h1b:'полный цикл', h1c:' продакшена', p:'Diom Production — студия аудио‑видео подкастов. Запишем и смонтируем ваш подкаст, предоставим студию или сделаем «под ключ».', cta1:'Забронировать студию', cta2:'Наши услуги', b1:'• Звукорежиссёр на смене', b2:'• 4K‑видео по запросу', b3:'• Вертикальные клипы'},
    services:{title:'Что мы делаем'},
    location:{title:'Локация', p:'Интерьеры для съёмок — горизонтальная лента вертикальных 9:16 превью.'},
    vocal:{title:'Спецпредложение для вокалистов', p:'Готовое видео: запись вокала + сведение + вертикальная съёмка.', bullets:['Готовое видео для YouTube в 4K','2–3 рилс на базе готового видео','Два ракурса + тайминг под бит'], cta1:'Записаться', cta2:'Тарифы', priceNote:'300 лари «под ключ»: включает 1 час в студии и сведение одного трека.'},
    work:{title:'Портфолио', p:'Примеры работ: подкасты, шоу, прямые эфиры, запись вокала.'},
    pricing:{title:'Тарифы', note:'Цены ориентировочные и зависят от задач. Запросите точную смету.'},
    contact:{title:'Свяжитесь с нами', p:'Опишите задачу — подберём слот, оборудование и команду.', phone:'+995 5XX XXX XXX', address:'Батуми, Грибоедова 21, 3 этаж', how:'Как добраться — Instagram Stories', form:{ name:'Имя', email:'Email', phone:'Телефон', interest:'Интересует', msg:'Сообщение', send:'Отправить заявку', options:['Аренда студии','Запись подкаста','Подкаст «под ключ»','Vocal Reels','Другое'] }},
  },
  en: {
    nav:{services:'Services', location:'Location', work:'Portfolio', pricing:'Pricing', contact:'Contacts', book:'Book now'},
    hero:{badge:'Professional audio/video studio', h1a:'Podcasts, shoots and ', h1b:'full‑cycle', h1c:' production', p:'Diom Production — audio‑video podcast studio. Record and edit your podcast, rent the studio, or get a turnkey service.', cta1:'Book the studio', cta2:'Our services', b1:'• On‑site sound engineer', b2:'• 4K on request', b3:'• Vertical clips'},
    services:{title:'What we do'},
    location:{title:'Location', p:'Studio interiors — horizontal strip of vertical 9:16 previews.'},
    vocal:{title:'Special offer for vocalists', p:'Finished video: vocal recording + mixing + vertical shoot.', bullets:['Finished 4K video for YouTube','2–3 reels cut from final video','Two angles + beat‑timed'], cta1:'Book', cta2:'Pricing', priceNote:'300 GEL turnkey: includes 1 hour in studio and one track mixing.'},
    work:{title:'Portfolio', p:'Sample work: podcasts, shows, live, vocal.'},
    pricing:{title:'Pricing', note:'Prices are indicative; ask for a quote.'},
    contact:{title:'Contact us', p:'Tell us about your project — we will pick a slot, gear and team.', phone:'+995 5XX XXX XXX', address:'Batumi, 21 Griboedov St, 3rd floor', how:'How to reach — Instagram Stories', form:{ name:'Name', email:'Email', phone:'Phone', interest:'Interest', msg:'Message', send:'Send request', options:['Studio rent','Podcast recording','Turnkey podcast','Vocal Reels','Other'] }},
  },
  ka: {
    nav:{services:'სერვისები', location:'ლოკაცია', work:'პორტფოლიო', pricing:'ტარიფები', contact:'კონტაქტი', book:'დაჯავშნა'},
    hero:{badge:'პროფესიონალური აუდიო/ვიდეო სტუდია', h1a:'პოდკასტები, გადაღებები და ', h1b:'სრული ციკლი', h1c:' წარმოება', p:'Diom Production — აუდიო‑ვიდეო პოდკასტების სტუდია. ჩაიწერეთ და დამონტაჟეთ თქვენი პოდკასი, იქირავეთ სტუდია ან მიიღეთ turnkey მომსახურება.', cta1:'სტუდიის დაჯავშნა', cta2:'ჩვენი სერვისები', b1:'• საიტზე რეჟისორი', b2:'• 4K მოთხოვნით', b3:'• ვერტიკალური კლიპები'},
    services:{title:'რა ვაკეთებთ'},
    location:{title:'ლოკაცია', p:'სტუდიის ინტერიერები — ჰორიზონტალური 9:16 პრევიუების ლენტი.'},
    vocal:{title:'სპეც შეთავაზება მომღერლებისთვის', p:'მზად ვიდეო: ვოკალის ჩაწერა + მიქსი + ვერტიკალური გადაღება.', bullets:['მზად 4K ვიდეო YouTube‑ისთვის','2–3 რილსი მზად ვიდეოდან','ორი კუთხე + ბიტზე გათანაბრება'], cta1:'ჩაწერა', cta2:'ტარიფები', priceNote:'300 ლარი turnkey: მოიცავს 1 საათს სტუდიაში და ერთი ტრეკის მიქსს.'},
    work:{title:'პორტფოლიო', p:'მაგალითები: პოდკასტები, შოუები, ლაივები, ვოკალი.'},
    pricing:{title:'ტარიფები', note:'ფასები სადემონსტრაციოია; მოითხოვეთ ბიუჯეტი.'},
    contact:{title:'დაგვიკავშირდით', p:'გვითხარით ამოცანა — შევარჩევთ დროს, აპარატურას და გუნდს.', phone:'+995 5XX XXX XXX', address:'ბათუმი, გრიბოედოვის 21, 3 სართული', how:'როგორ მოვიდეთ — Instagram Stories', form:{ name:'სახელი', email:'ელფოსტა', phone:'ტელეფონი', interest:'ინტერესი', msg:'შეტყობინება', send:'გაგზავნა', options:['სტუდიის ქირა','პოდკასტის ჩაწერა','Turnkey პოდკასი','Vocal Reels','სხვა'] }},
  },
};

const HERO_MEDIA = { kind:"youtube", id:"3dD_8ztcwto", title:"Шоурил студии" };
const VOCAL_MEDIA = { kind:"instagram", id:"DD9noDkI0YL", title:"Instagram: Vocal Offer", ratio:"3:4" };

function ytThumb(id){ return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }
function svgThumb(provider, title, ratio){
  const r = ratio === '3:4' ? {w:900,h:1200} : {w:1280,h:720};
  const safe = (title||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const svg = `<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns='http://www.w3.org/2000/svg' width='${r.w}' height='${r.h}' viewBox='0 0 ${r.w} ${r.h}'>
<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#0b0b0f'/><stop offset='100%' stop-color='#000'/></linearGradient>
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0.08'/></feComponentTransfer></filter></defs>
<rect width='100%' height='100%' fill='url(#g)'/><rect width='100%' height='100%' filter='url(#n)' opacity='0.15'/>
<g><rect x='24' y='24' rx='14' ry='14' fill='rgba(0,0,0,0.55)' stroke='rgba(255,255,255,0.15)' stroke-width='2' width='480' height='60'/><text x='48' y='62' fill='#9A00FF' font-size='32' font-family='Inter, system-ui' font-weight='800'>${provider||'Video'}</text></g>
<g><text x='48' y='${r.h/2-10}' fill='#fff' font-size='${Math.max(22,Math.floor(r.h/20))}' font-family='Inter, system-ui' font-weight='700'>${safe}</text>
<text x='48' y='${r.h/2+30}' fill='rgba(255,255,255,0.7)' font-size='${Math.max(16,Math.floor(r.h/36))}' font-family='Inter, system-ui'>Diom Production</text></g>
<circle cx='${r.w-100}' cy='${r.h-100}' r='44' fill='rgba(0,0,0,0.5)' stroke='rgba(255,255,255,0.2)'/>
<polygon points='${r.w-112},${r.h-126} ${r.w-112},${r.h-74} ${r.w-74},${r.h-100}' fill='#fff'/></svg>`;
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}

function Modal({ open, onClose, children }){
  const rootRef = useRef(null);
  const lastFocused = useRef(null);
  useEffect(()=>{ if(open){ lastFocused.current=document.activeElement; document.body.style.overflow='hidden';
    const f=rootRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); setTimeout(()=>f?.focus(),0);
  } else { document.body.style.overflow=''; if(lastFocused.current?.focus) lastFocused.current.focus(); } },[open]);
  useEffect(()=>{ const onKey=(e)=>{ if(e.key==='Escape'&&open) onClose(); }; window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey); },[open,onClose]);
  useEffect(()=>{ if(!open) return; const node=rootRef.current; if(!node) return; const sel='a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'; const list=()=>Array.from(node.querySelectorAll(sel)).filter(el=>!el.disabled);
    function onKey(e){ if(e.key!=='Tab') return; const f=list(); if(!f.length) return; const first=f[0], last=f[f.length-1]; if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } }
    node.addEventListener('keydown', onKey); return ()=> node.removeEventListener('keydown', onKey);
  },[open]);
  if(!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="dialogTitle" aria-describedby="dialogDesc" style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(4px)',display:'grid',placeItems:'center',padding:16,zIndex:50}} onClick={onClose}>
      <div ref={rootRef} style={{position:'relative',width:'100%',maxWidth:960,aspectRatio:'16 / 9',border:'1px solid rgba(255,255,255,.12)',borderRadius:16,background:'#000',overflow:'hidden'}} onClick={(e)=> e.stopPropagation()}>
        <h2 id="dialogTitle" style={{position:'absolute',clip:'rect(1px,1px,1px,1px)'}}>Медиа</h2>
        <p id="dialogDesc" style={{position:'absolute',clip:'rect(1px,1px,1px,1px)'}}>Esc — закрыть</p>
        <button onClick={onClose} style={{position:'absolute',top:8,right:8,background:'rgba(255,255,255,.1)',color:'#fff',border:'1px solid rgba(255,255,255,.12)',borderRadius:10,padding:'8px 12px',cursor:'pointer',zIndex:20}}>Close</button>
        <div style={{position:'absolute', inset:0, zIndex:10, display:'grid', placeItems:'center'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Carousel({ items, renderItem, itemStyle }){
  const trackRef = useRef(null);
  const [dragging,setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartLeft = useRef(0);
  const moved = useRef(false);
  const lastDragTs = useRef(0);

  useEffect(()=>{
    const el = trackRef.current; if(!el) return;
    const down = (e)=>{ setDragging(true); moved.current=false; dragStartX.current = e.clientX; dragStartLeft.current = el.scrollLeft; el.style.scrollBehavior='auto'; try{ el.setPointerCapture?.(e.pointerId); }catch{} };
    const move = (e)=>{ if(!dragging) return; const dx = e.clientX - dragStartX.current; if(Math.abs(dx)>2) moved.current = true; el.scrollLeft = dragStartLeft.current - dx; };
    const up = ()=>{ if(!dragging) return; setDragging(false); el.style.scrollBehavior=''; if(moved.current) lastDragTs.current = Date.now(); };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointerleave', up); el.addEventListener('pointercancel', up);
    const wheel=(e)=>{ if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){ e.preventDefault(); el.scrollLeft += e.deltaY * 0.8; } };
    el.addEventListener('wheel', wheel, {passive:false});
    return ()=>{ el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointerleave', up); el.removeEventListener('pointercancel', up); el.removeEventListener('wheel', wheel); };
  },[dragging]);

  const allowOpen = ()=> Date.now() - lastDragTs.current > 250;
  function slideW(){ const el=trackRef.current; if(!el) return 360; const first = el.querySelector('.slide'); return first? first.getBoundingClientRect().width + 16 : 360; }
  function scrollBySmooth(px){ const el = trackRef.current; if(!el) return; el.style.scrollBehavior='smooth'; el.scrollBy({left:px, behavior:'smooth'}); window.setTimeout(()=>{ if(el) el.style.scrollBehavior=''; }, 300); }

  return (
    <div style={{position:'relative',marginTop:24}}>
      <button aria-label="Назад" className="arrow" onClick={()=> scrollBySmooth(-slideW())} style={{left:-8}}>‹</button>
      <div ref={trackRef} id="track" style={{display:'flex',gap:16,overflow:'hidden',cursor: dragging? 'grabbing':'grab', userSelect:'none'}}>
        {items.map((it,idx)=> (
          <div
            key={idx}
            className="slide"
            style={{
              flex:'0 0 clamp(280px, 33vw, 380px)',
              aspectRatio:'16 / 9',
              border:'1px solid rgba(255,255,255,.12)',
              borderRadius:16,
              overflow:'hidden',
              background:'linear-gradient(135deg,#111,#000)',
              ...(itemStyle || {})
            }}>
            {renderItem(it, { allowOpen })}
          </div>
        ))}
      </div>
      <button aria-label="Вперёд" className="arrow" onClick={()=> scrollBySmooth(slideW())} style={{right:-8}}>›</button>
    </div>
  );
}

export default function App(){
  const [lang,setLang] = useState('ru');
  const L = I18N[lang];
  const [active,setActive] = useState(null);
  const [activeSection, setActiveSection] = useState('top');
  const [menuOpen, setMenuOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [locations, setLocations] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [vocal, setVocal] = useState(null);

  useEffect(()=>{
    let cancelled = false;
    async function load(){
      if(!hasCMS){
        if(!cancelled){
          setServices(MOCK.services.map(s=>({ title:s.title, bullets:s.bullets })));
          setPortfolio(MOCK.portfolio.map(p=>({ kind:p.kind, id:p.videoId, title:p.title?.[lang] || p.title?.ru || '' })));
          setLocations(Array.from({length:24}, (_,i)=> ({
            thumb:`https://picsum.photos/seed/diom-${i+1}/540/960`,
            full:`https://picsum.photos/seed/diom-${i+1}/1080/1920`,
            alt:`Diom location #${i+1}`
          })));
          setPricing(MOCK.pricing.map(c=>({ title:c.title?.[lang]||c.title?.ru||'', price:c.price?.[lang]||c.price?.ru||'', features:c.features?.ru||[] })));
          setVocal({
            title:L.vocal.title, text:L.vocal.p, bullets:L.vocal.bullets, priceNote:L.vocal.priceNote
          });
        }
        return;
      }
      try{
        const [pf, locs, srv, prc, voc] = await Promise.all([
          sanity.fetch(qPortfolio),
          sanity.fetch(qLocations),
          sanity.fetch(qServices),
          sanity.fetch(qPricing),
          sanity.fetch(qVocal),
        ]);
        if(cancelled) return;
        setPortfolio((pf||[]).map(p=>({ kind:p.kind, id:p.videoId, title:(p.title?.[lang] || p.title?.ru || '') })));
        setLocations((locs||[]).map(li=>{
          const t = urlFor(li.image, 540, 960) || `https://picsum.photos/seed/diom-${Math.random()}/540/960`;
          const f = urlFor(li.image,1080,1920) || t;
          return { thumb:t, full:f, alt:(li.alt?.[lang]||li.alt?.ru||'Location') };
        }));
        setServices((srv||[]).map(s=>({ title:{ru:s.title?.ru,en:s.title?.en,ka:s.title?.ka}, bullets:{ru:s.bullets?.ru||[],en:s.bullets?.en||[],ka:s.bullets?.ka||[]} })));
        setPricing((prc||[]).map(c=>({ title:c.title?.[lang]||c.title?.ru||'', price:c.price?.[lang]||c.price?.ru||'', features:c.features?.ru||[] })));
        setVocal({
          title: voc?.title?.[lang] || voc?.title?.ru || L.vocal.title,
          text:  voc?.text?.[lang]  || voc?.text?.ru  || L.vocal.p,
          bullets: voc?.bullets?.[lang] || voc?.bullets?.ru || L.vocal.bullets,
          priceNote: voc?.priceNote?.[lang] || voc?.priceNote?.ru || L.vocal.priceNote
        });
      }catch(e){
        console.warn('CMS load failed, using mocks', e);
        if(cancelled) return;
        setServices(MOCK.services);
        setPortfolio(MOCK.portfolio.map(p=>({ kind:p.kind, id:p.videoId, title:p.title?.[lang]||'' })));
        setLocations(Array.from({length:24}, (_,i)=> ({
          thumb:`https://picsum.photos/seed/diom-${i+1}/540/960`,
          full:`https://picsum.photos/seed/diom-${i+1}/1080/1920`,
          alt:`Diom location #${i+1}`
        })));
        setPricing(MOCK.pricing.map(c=>({ title:c.title?.[lang]||'', price:c.price?.[lang]||'', features:c.features?.ru||[] })));
        setVocal({
          title:L.vocal.title, text:L.vocal.p, bullets:L.vocal.bullets, priceNote:L.vocal.priceNote
        });
      }
    }
    load();
    return ()=>{ cancelled = true }
  }, [lang]);

  const heroThumb = useMemo(()=> ytThumb(HERO_MEDIA.id), []);

  useEffect(()=>{
    const nav = document.querySelector('nav.nav');
    if(!nav) return;
    const handler = (e)=>{
      const a = e.target.closest('a[href^="#"]');
      if(!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
      window.scrollTo({ top, behavior:'smooth' });
    };
    nav.addEventListener('click', handler);
    return ()=> nav.removeEventListener('click', handler);
  },[]);

  // Active menu highlight (robust for small sections)
  useEffect(() => {
    const ids = ['top','services','location','work','pricing','contact'];
    let ticking = false;

    function compute() {
      const vh = window.innerHeight;
      const halfVh = vh / 2;

      const docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      if (Math.ceil(window.scrollY + vh) >= docH) {
        setActiveSection(ids[ids.length - 1]);
        ticking = false;
        return;
      }

      const sections = ids.map(id => {
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const visibleVp = Math.max(0, Math.min(vh, r.bottom) - Math.max(0, r.top));
        const visibleSelf = r.height > 0 ? visibleVp / r.height : 0;
        return { id, top: r.top, bottom: r.bottom, height: r.height, visibleVp, visibleSelf };
      }).filter(Boolean);

      const visibles = sections.filter(s => s.visibleVp > 0).sort((a,b) => a.top - b.top);
      if (!visibles.length) { setActiveSection(null); ticking = false; return; }

      const topmost = visibles[0];
      const topmostCoversHalfViewport = (topmost.visibleVp >= 0.5 * vh);
      const topmostHalfOfSelfInTopHalf = (topmost.visibleSelf >= 0.5 && topmost.top < halfVh);
      const topmostActive = topmostCoversHalfViewport || topmostHalfOfSelfInTopHalf;

      if (topmostActive) {
        setActiveSection(topmost.id);
        ticking = false;
        return;
      }

      const current = sections.find(s => s.id === activeSection);
      if (current && current.visibleSelf >= 0.5) { ticking = false; return; }

      const idx = ids.indexOf(topmost.id);
      const nextId = ids[Math.min(idx + 1, ids.length - 1)];
      const next = sections.find(s => s.id === nextId);

      let nextActiveId = null;
      if (next) {
        const overlapTopHalf = Math.max(0, Math.min(halfVh, next.bottom) - Math.max(0, next.top));
        const nextIntersectsTopHalf = overlapTopHalf > 0;
        const nextSelfHalfVisible = next.visibleSelf >= 0.5;
        if (nextIntersectsTopHalf || nextSelfHalfVisible) nextActiveId = next.id;
      }

      setActiveSection(nextActiveId);
      ticking = false;
    }

    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute); } };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [activeSection]);

  function MobileMenu({ open, onClose }){
    const panelRef = useRef(null);
    const lastFocused = useRef(null);
    useEffect(()=>{ if(open){ lastFocused.current=document.activeElement; document.body.style.overflow='hidden';
      setTimeout(()=> panelRef.current?.querySelector('a,button')?.focus(), 0);
    } else { document.body.style.overflow=''; lastFocused.current?.focus?.(); } },[open]);
    useEffect(()=>{ if(!open) return; const onKey=(e)=>{ if(e.key==='Escape') onClose(); }; window.addEventListener('keydown', onKey); return ()=> window.removeEventListener('keydown', onKey); },[open,onClose]);
    useEffect(()=>{ if(!open) return; const node=panelRef.current; if(!node) return; const sel='a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'; const list=()=>Array.from(node.querySelectorAll(sel)).filter(el=>!el.disabled);
      function onKey(e){ if(e.key!=='Tab') return; const f=list(); if(!f.length) return; const first=f[0], last=f[f.length-1]; if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } }
      node.addEventListener('keydown', onKey); return ()=> node.removeEventListener('keydown', onKey);
    },[open]);
    if(!open) return null;
    return (
      <div className="menu-ovl" role="dialog" aria-modal="true" aria-labelledby="menuTitle" onClick={onClose}>
        <div className="menu-panel" ref={panelRef} onClick={(e)=> e.stopPropagation()}>
          <h2 id="menuTitle" style={{margin:0,fontSize:18}}>Меню</h2>
          <nav className="menu-links">
            <a href="#services" className={activeSection==='services'? 'active':''} onClick={onClose}>{L.nav.services}</a>
            <a href="#location" className={activeSection==='location'? 'active':''} onClick={onClose}>{L.nav.location}</a>
            <a href="#work" className={activeSection==='work'? 'active':''} onClick={onClose}>{L.nav.work}</a>
            <a href="#pricing" className={activeSection==='pricing'? 'active':''} onClick={onClose}>{L.nav.pricing}</a>
            <a href="#contact" className={activeSection==='contact'? 'active':''} onClick={onClose}>{L.nav.contact}</a>
          </nav>
          <div className="lang" style={{display:'flex',gap:6}}>
            {(['ru','en','ka']).map(code=> (
              <button key={code} className={code===lang? 'is-active':''} onClick={()=> setLang(code)}>{code.toUpperCase()}</button>
            ))}
          </div>
          <a href="#contact" className="btn" onClick={onClose}>{L.nav.book}</a>
          <button className="btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="wrap" style={{padding:'14px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <a href="#top" className="brand">
            <img src={LOGO_URL} alt="Diom Production" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
            <strong style={{lineHeight:1}}>Diom <span style={{color:ACCENT}}>Production</span></strong>
          </a>
          <nav className="nav">
            <a href="#services" className={activeSection==='services'?'active':''}>{L.nav.services}</a>
            <a href="#location" className={activeSection==='location'?'active':''}>{L.nav.location}</a>
            <a href="#work" className={activeSection==='work'?'active':''}>{L.nav.work}</a>
            <a href="#pricing" className={activeSection==='pricing'?'active':''}>{L.nav.pricing}</a>
            <a href="#contact" className={activeSection==='contact'?'active':''}>{L.nav.contact}</a>
            <a href="#contact" className="btn">{L.nav.book}</a>
            <div className="lang" style={{display:'flex', gap:6}}>
              {(['ru','en','ka']).map(code=> (
                <button key={code} className={code===lang? 'is-active':''} onClick={()=> setLang(code)}>{code.toUpperCase()}</button>
              ))}
            </div>
          </nav>
          <button className="hamb" aria-label="Меню" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={()=> setMenuOpen(true)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={()=> setMenuOpen(false)} />

      {/* HERO */}
      <section id="top" style={{padding:'64px 0'}}>
        <div className="wrap md-grid-2" style={{alignItems:'center'}}>
          <div style={{display:'grid', gap:16}}>
            <span className="chip">{L.hero.badge}</span>
            <h1 style={{margin:'6px 0', fontSize:40, lineHeight:1.1, fontWeight:800}}>
              {L.hero.h1a}<span style={{color:ACCENT}}>{L.hero.h1b}</span>{L.hero.h1c}
            </h1>
            <p style={{color:'rgba(255,255,255,.75)', maxWidth:'52ch'}}>{L.hero.p}</p>
            <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
              <a href="#contact" className="btn">{L.hero.cta1}</a>
              <a href="#services" className="btn-outline">{L.hero.cta2}</a>
            </div>
            <div style={{display:'flex', gap:18, flexWrap:'wrap', color:'rgba(255,255,255,.6)', fontSize:14}}>
              <span>{L.hero.b1}</span><span>{L.hero.b2}</span><span>{L.hero.b3}</span>
            </div>
          </div>
          <div style={{position:'relative'}}>
            <div style={{position:'relative', width:'100%', paddingTop:'56.25%', border:'1px solid rgba(255,255,255,.12)', borderRadius:24, overflow:'hidden', boxShadow:'0 30px 80px rgba(154,0,255,.15)'}}>
              <button aria-label={"Шоурил"} onClick={()=> setActive(HERO_MEDIA)} style={{position:'absolute', inset:0, width:'100%', height:'100%', background:`#000 url(${ytThumb(HERO_MEDIA.id)}) center/cover no-repeat`, border:0, cursor:'pointer'}}/>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{padding:'36px 0', borderTop:'1px solid rgba(255,255,255,.12)', background:'linear-gradient(#000,#0b0b0b)'}}>
        <div className="wrap">
          <h2 style={{fontSize:28, fontWeight:800, margin:'0 0 14px'}}>{L.services.title}</h2>
          <div className="svc-3">
            {(services.length? services : (MOCK.services)).slice(0,3).map((s,i)=> {
              const title = s.title?.[lang] || s.title?.ru || s.title || '';
              const bullets = (s.bullets?.[lang] || s.bullets?.ru || s.bullets || []);
              return (
                <div key={i} className="card">
                  <div style={{fontWeight:700}}>{title}</div>
                  <ul style={{margin:'8px 0 0 0', padding:'0 0 0 18px', color:'rgba(255,255,255,.75)'}}>
                    {bullets.map((b,bi)=> (<li key={bi}>{b}</li>))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* LOCATION (9:16 strip) */}
      <section id="location" style={{padding:'36px 0', borderTop:'1px solid rgba(255,255,255,.12)'}}>
        <div className="wrap">
          <h3 style={{fontSize:28, fontWeight:800, margin:'0 0 8px'}}>{L.location.title}</h3>
          <p style={{color:'rgba(255,255,255,.7)', margin:0}}>{L.location.p}</p>
          <Carousel
            items={(locations.length? locations : Array.from({length:24}, (_,i)=>({thumb:`https://picsum.photos/seed/diom-${i+1}/540/960`, full:`https://picsum.photos/seed/diom-${i+1}/1080/1920`, alt:`Diom location #${i+1}`})))}
            itemStyle={{ flex:'0 0 clamp(140px, 18vw, 220px)', aspectRatio:'9 / 16' }}
            renderItem={(it,{allowOpen}) => (
              <button
                aria-label={it.alt}
                onClick={() => { if(allowOpen()) setActive({kind:'image', src:it.full, title:it.alt}); }}
                style={{
                  display:'block', width:'100%', height:'100%',
                  border:0, padding:0,
                  background:`#000 url(${it.thumb}) center/cover no-repeat`,
                  cursor:'pointer'
                }}
              />
            )}
          />
        </div>
      </section>

      {/* VOCAL OFFER */}
      <section id="vocal" style={{padding:'36px 0', borderTop:'1px solid rgba(255,255,255,.12)'}}>
        <div className="wrap md-grid-2" style={{alignItems:'center'}}>
          <div>
            <h3 style={{fontSize:28, fontWeight:800, margin:'0 0 8px'}}>{vocal?.title || L.vocal.title}</h3>
            <p style={{color:'rgba(255,255,255,.75)'}}>{vocal?.text || L.vocal.p}</p>
            <ul style={{margin:'12px 0 0 0', padding:'0 0 0 18px', color:'rgba(255,255,255,.75)'}}>
              {(vocal?.bullets || L.vocal.bullets).map((x,i)=> (<li key={i}>{x}</li>))}
            </ul>
            <div style={{marginTop:14, display:'flex', gap:10, flexWrap:'wrap'}}>
              <a href="#contact" className="btn">{L.vocal.cta1}</a>
              <a href="#pricing" className="btn-outline">{L.vocal.cta2}</a>
            </div>
            <p style={{marginTop:10, color:'#9A00FF', fontSize:14}}>{vocal?.priceNote || L.vocal.priceNote}</p>
          </div>
          <div>
            <div style={{position:'relative', width:'100%', paddingTop:'133.33%', border:'1px solid rgba(255,255,255,.12)', borderRadius:24, overflow:'hidden'}}>
              <button aria-label={"Vocal"} onClick={()=> setActive(VOCAL_MEDIA)} style={{position:'absolute', inset:0, width:'100%', height:'100%', background:`#000 url(${svgThumb('Instagram','Instagram', '3:4')}) center/cover no-repeat`, border:0, cursor:'pointer'}}/>
            </div>
          </div>
        </div>
      </section>

      {/* WORK — CAROUSEL */}
      <section id="work" style={{padding:'36px 0', borderTop:'1px solid rgba(255,255,255,.12)', background:'linear-gradient(#000,#0b0b0b)'}}>
        <div className="wrap">
          <h3 style={{fontSize:28, fontWeight:800, margin:'0 0 8px'}}>{L.work.title}</h3>
          <p style={{color:'rgba(255,255,255,.7)', margin:0}}>{L.work.p}</p>
          <Carousel
            items={(portfolio.length? portfolio : [
              { kind:"youtube", id:"drGxjSkI3UQ", title:"Подкаст YouTube" },
              { kind:"youtube", id:"3dD_8ztcwto", title:"YouTube Шоу" },
              { kind:"youtube", id:"5qap5aO4i9A", title:"Прямая трансляция" },
              { kind:"instagram", id:"DD9noDkI0YL", title:"Запись вокала", ratio:"3:4" },
            ])}
            renderItem={(v,{allowOpen})=> (
              <button aria-label={v.title} onClick={()=>{ if(allowOpen()) setActive(v); }}
                style={{display:'block', width:'100%', height:'100%', border:0, padding:0, background:`#000 url(${v.kind==='youtube'? ytThumb(v.id): svgThumb('Instagram', v.title, v.ratio)}) center/cover no-repeat`, cursor:'pointer'}} />
            )}
          />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{padding:'36px 0', borderTop:'1px solid rgba(255,255,255,.12)'}}>
        <div className="wrap">
          <h3 style={{fontSize:28, fontWeight:800, margin:'0 0 10px'}}>{L.pricing.title}</h3>
          <div className="price-grid">
            {(pricing.length? pricing : []).concat(pricing.length? [] : [
              { title:'Аренда для самостоятельных съёмок', price:'от 60 лари/час', features:['Базовый свет','Фоны','2 микрофона + рекордер','Помощь ассистента']},
              { title:'Стриминг/трансляция', price:'от 140 лари/час', features:['Мультикамерный стрим','Графика/титры','Чат/RTMP','Техподдержка']},
              { title:'Съёмка видео', price:'от 130 лари/час', features:['Оператор','Свет','Фон/локация','Передача материала']},
              { title:'Съёмка и монтаж', price:'от 200 лари/час', features:['Оператор','Монтаж','Базовая графика','Экспорт 4K']},
              { title:'Съёмка и запись вокала «под ключ»', price:'300 лари/час', features:['Запись вокала','Сведение одного трека','Съёмка','4K экспорт']},
              { title:'Выездные трансляции', price:'от $500/смена', features:['Мобильный кейс','Несколько камер','Графика и чат','Тех. команда']},
            ]).map((c,idx)=> (
              <div key={idx} className="card">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
                  <div style={{fontWeight:600}}>{c.title}</div>
                </div>
                <div style={{marginTop:6, fontSize:20, fontWeight:800, color:'#9A00FF'}}>{c.price}</div>
                <ul style={{margin:'10px 0 0 0', padding:'0 0 0 18px', color:'rgba(255,255,255,.75)'}}>
                  {(c.features||[]).map((f,i)=> (<li key={i}>{f}</li>))}
                </ul>
              </div>
            ))}
          </div>
          <table className="price-table" style={{marginTop:16}}>
            <tbody>
              {((pricing.length? pricing : [])).concat(pricing.length? [] : [
                { title:'Аренда для самостоятельных съёмок', price:'от 60 лари/час' },
                { title:'Стриминг/трансляция', price:'от 140 лари/час' },
                { title:'Съёмка видео', price:'от 130 лари/час' },
                { title:'Съёмка и монтаж', price:'от 200 лари/час' },
                { title:'Съёмка и запись вокала «под ключ»', price:'300 лари/час' },
                { title:'Выездные трансляции', price:'от $500/смена' },
              ]).map((c,idx)=> (
                <tr key={idx}>
                  <td style={{padding:'10px 12px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.12)', borderRight:'none', borderRadius:'10px 0 0 10px'}}>{c.title}</td>
                  <td style={{padding:'10px 12px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.12)', borderLeft:'none', borderRadius:'0 10px 10px 0', textAlign:'right', color:'#9A00FF', fontWeight:700}}>{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{marginTop:10, color:'rgba(255,255,255,.7)'}}>{L.pricing.note}</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:'36px 0', borderTop:'1px solid rgba(255,255,255,.12)', background:'linear-gradient(#000,#0b0b0b)'}}>
        <div className="wrap md-grid-2">
          <div>
            <h3 style={{fontSize:28, fontWeight:800, margin:'0 0 10px'}}>{L.contact.title}</h3>
            <p style={{color:'rgba(255,255,255,.75)'}}>{L.contact.p}</p>
            <div style={{marginTop:12, display:'grid', gap:8, color:'rgba(255,255,255,.75)'}}>
              <div>📞 {L.contact.phone}</div>
              <div>✉️ hello@diom.production</div>
              <div>📍 {L.contact.address}</div>
              <div>🧭 <a href="https://www.instagram.com/stories/highlights/18305805712240283/" target="_blank" rel="noreferrer" style={{color:'#9A00FF', textDecoration:'underline'}}>{L.contact.how}</a></div>
            </div>
          </div>
          <form onSubmit={(e)=>{ e.preventDefault(); alert('Спасибо! Мы свяжемся с вами.'); }} className="card">
            <label>{L.contact.form.name}<br/>
              <input required placeholder="Как к вам обращаться" style={{width:'100%', marginTop:6, padding:12, borderRadius:12, border:'1px solid rgba(255,255,255,.12)', background:'#000', color:'#fff'}}/>
            </label>
            <div style={{display:'grid', gap:12, gridTemplateColumns:'1fr 1fr', marginTop:12}}>
              <label>{L.contact.form.email}<br/>
                <input type="email" placeholder="you@example.com" style={{width:'100%', marginTop:6, padding:12, borderRadius:12, border:'1px solid rgba(255,255,255,.12)', background:'#000', color:'#fff'}}/>
              </label>
              <label>{L.contact.form.phone}<br/>
                <input placeholder="+995 ..." style={{width:'100%', marginTop:6, padding:12, borderRadius:12, border:'1px solid rgba(255,255,255,.12)', background:'#000', color:'#fff'}}/>
              </label>
            </div>
            <label style={{display:'block', marginTop:12}}>{L.contact.form.interest}<br/>
              <select style={{width:'100%', marginTop:6, padding:12, borderRadius:12, border:'1px solid rgba(255,255,255,.12)', background:'#000', color:'#fff'}}>
                {L.contact.form.options.map((o,i)=> (<option key={i}>{o}</option>))}
              </select>
            </label>
            <label style={{display:'block', marginTop:12}}>{L.contact.form.msg}<br/>
              <textarea rows={4} placeholder="Коротко опишите задачу" style={{width:'100%', marginTop:6, padding:12, borderRadius:12, border:'1px solid rgba(255,255,255,.12)', background:'#000', color:'#fff'}}/>
            </label>
            <button className="btn" style={{marginTop:12}}>{L.contact.form.send}</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid rgba(255,255,255,.12)', padding:'20px 0', color:'rgba(255,255,255,.75)'}}>
        <div className="wrap" style={{display:'flex', gap:16, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap'}}>
          <div>© {new Date().getFullYear()} Diom Production</div>
          <div><a href="https://www.instagram.com/diom_production/" target="_blank" rel="noreferrer" style={{color:'#fff'}}>Instagram</a></div>
          <div className="lang" style={{display:'flex', gap:6}}>
            {(['ru','en','ka']).map(code=> (
              <button key={code} className={code===lang? 'is-active':''} onClick={()=> setLang(code)}>{code.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <Modal open={!!active} onClose={()=> setActive(null)}>
        {active?.kind === 'youtube' && (
          <iframe title={active.title||'YouTube'} src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{position:'absolute', inset:0, width:'100%', height:'100%', border:0}} />
        )}
        {active?.kind === 'instagram' && (
          <iframe title={active.title||'Instagram'} src={`https://www.instagram.com/p/${active.id}/embed`} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen style={{position:'absolute', inset:0, width:'100%', height:'100%', border:0}} />
        )}
        {active?.kind === 'image' && (
          <img src={active.src} alt={active.title||'Image'} style={{maxWidth:'100%', maxHeight:'100%', objectFit:'contain'}}/>
        )}
      </Modal>
    </div>
  );
}
