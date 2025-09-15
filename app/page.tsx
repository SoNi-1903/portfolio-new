'use client'

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Send, ArrowRight, User, ExternalLink } from "lucide-react";

/**
 * Полный рабочий файл (Next app/page.tsx).
 * Исправлены ошибки: корректные ref-коллбэки и TS-совместимость.
 */

function ShinyStar({ className = "" }) {
  return (
    <span className={"relative inline-block w-4 h-4 " + className} aria-hidden="true">
      <span
        className="absolute inset-0 rotate-45 rounded-[3px] bg-gradient-to-br from-violet-400 to-fuchsia-400 animate-[spin_6s_linear_infinite] shadow-[0_0_8px_rgba(167,139,250,0.7)] transform-gpu"
        style={{ willChange: "transform" }}
      />
      <span
        className="absolute inset-0 -rotate-45 rounded-[3px] bg-gradient-to-tr from-fuchsia-400 to-violet-400 animate-[spin_8s_linear_infinite_reverse] opacity-80 transform-gpu"
        style={{ willChange: "transform" }}
      />
      <span className="absolute -inset-1 rounded-full bg-violet-500/25 blur-[6px]" />
    </span>
  );
}

const TELEGRAM = "https://t.me/Somov2k03";
const TELEGRAM_REVIEWS_URL = "https://t.me/potfolio_Somov/5";
const TELEGRAM_PORTFOLIO_DESIGN = "https://t.me/portfolio_design_Somov";
const TELEGRAM_PORTFOLIO_VIDEO = "https://t.me/portfolio_reels_Somov";

const HERO_PHOTO = "/hero.jpg";

const MENU = [
  { label: "Главная", href: "#home" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Контакты", href: "#contact" },
];

const SERVICES = [
  { title: "Сайты на Tilda", desc: "Адаптивные лендинги и многостраничные сайты на Tilda под ваши задачи.", priceText: "2 000₽ / блок", features: ["Структура и дизайн блоков","Базовая SEO-настройка","Подключение домена (по желанию)"] },
  { title: "Визуальное оформление соцсетей (ВК)", desc: "Полное оформление сообщества ВКонтакте.", priceText: "от 1 500₽", variants: [{ name: "ВК под ключ", price: "6 000₽" },{ name: "Обложка", price: "1 500₽" }] },
  { title: "Инфопродукты", desc: "Гайды, чек‑листы, руководства, продающие презентации.", priceText: "350₽ / слайд" },
  { title: "Рекламные креативы", desc: "Статичные и анимированные креативы для рекламы.", priceText: "от 500₽" },
  { title: "Инфографика (карточки маркетплейсов)", desc: "Карточки товаров для Wildberries/OZON и других площадок.", priceText: "350₽ / шт" },
  { title: "Логотип и фирменный стиль", desc: "Разработка логотипа и базовой айдентики.", priceText: "от 3 000₽" },
  { title: "Reels / монтаж видео", desc: "Монтаж коротких роликов для соцсетей.", priceText: "от 1 000₽", note: "Итоговая стоимость зависит от задач и сложности — уточните в сообщении." },
  { title: "Видеомонтаж для онлайн‑школ", desc: "Уроки, автовебинары, заставки для уроков или вебинаров.", priceText: "цена договорная" },
  { title: "Монтаж заставок / промо / YouTube / креативов", desc: "Подготовка пакетов под канал и рекламу.", priceText: "цена договорная" },
  { title: "Сайты на базе ИИ", desc: "Сборка и дизайн лендингов с применением ИИ‑инструментов.", priceText: "цена договорная" },
];

const PORTFOLIO_TABS = ["Дизайн", "Видео"];

const INITIAL_REVIEWS = [
  { id: "preset-1", name: "Юля", text: "Заказывали инфографику для маркетплейсов. Никита сделал всё в оговорённый срок. Правки вносились быстро. Спасибо!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-2", name: "Helen RBP", text: "Делала заказ у Никиты для баннера и аватарки на YouTube. Выполнил очень быстро, мы остались довольны! Хорошее качество работы и внимательный человек. Рекомендую!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-3", name: "Ksusha", text: "Работали с Никитой уже несколько раз (монтаж видео). Делает работу оперативно и качественно; если есть правки — быстро исправляет. Рекомендую!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-4", name: "Helen RBP", text: "Спасибо Никите за новый формат в работе с баннером. Всегда идёт навстречу и всегда на связи!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-5", name: "Анастасия", text: "Работали с Никитой длительное время по монтажу разного формата видео. Отличная работа, всегда на связи, всегда поможет и подскажет. Приятно работать — при первой возможности будем взаимодействовать снова! Спасибо!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-6", name: "Galina", text: "Спасибо Никите за доработку логотипа — ответственный подход к работе и большое терпение. Рекомендую!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-7", name: "Katrina", text: "Заказывала у Никиты видеомонтаж нескольких роликов — очень довольна результатом! Отвечает оперативно, глубоко вникает в задачу и делает по ТЗ. Однозначно рекомендую!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-8", name: "Клиент", text: "Заказывала у Никиты логотипы — работа выполнена на отлично! Специалист высокого уровня, качество работ замечательное. Правки вносились практически моментально. Рекомендую!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
  { id: "preset-9", name: "Клиент", text: "Заказал логотип и фирменный стиль компании — всё чётко, с первого раза попал. Очень понравилось!", sourceUrl: TELEGRAM_REVIEWS_URL, createdAt: "2025-09-12T00:00:00.000Z", authorId: "preset" },
];

const sanitize = (s: string) => (s || "").replace(/[<>]/g, "");

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch { return ""; }
};

function useSmoothScroll() {
  return useCallback((hash?: string) => {
    try {
      const id = hash?.startsWith("#") ? hash : `#${hash}`;
      const el = id && document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history?.replaceState) history.replaceState(null, "", id);
        else window.location.hash = id;
      }
    } catch {}
  }, []);
}

function useReviews() {
  const KEY = "somov_reviews";
  const CLIENT_KEY = "somov_client";
  const OWNER_KEY = "somov_owner";

  const [clientId] = useState(() => {
    try {
      const ex = localStorage.getItem(CLIENT_KEY);
      if (ex) return ex;
      const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(CLIENT_KEY, id);
      return id;
    } catch { return "anon"; }
  });
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => { try { setIsOwner(localStorage.getItem(OWNER_KEY) === "1"); } catch {} }, []);

  const [items, setItems] = useState(INITIAL_REVIEWS);

  const stripTest = useCallback((list: any[]) => {
    try {
      return (list || []).filter((r) => {
        const name = (r?.name || "").trim().toLowerCase();
        const text = (r?.text || "").trim().toLowerCase();
        const isTestName = name === "нит" || name === "nit";
        const isTestText = text.includes("круто выглядит");
        return !(isTestName || isTestText);
      });
    } catch { return list || []; }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
        const byId = new Map();
        [...INITIAL_REVIEWS, ...parsed].forEach((it: any) => byId.set(it.id || `${it.name}-${it.createdAt}`, it));
        const merged = stripTest(Array.from(byId.values())).map((it: any) => ({
          ...it,
          createdAt: it?.createdAt ?? new Date().toISOString(),
          authorId: it?.authorId ?? "preset",
        }));
        setItems(merged);
        localStorage.setItem(KEY, JSON.stringify(merged));
      } else {
        const seeded = stripTest(INITIAL_REVIEWS as any).map((it: any) => ({
          ...it,
          createdAt: it?.createdAt ?? new Date().toISOString(),
          authorId: it?.authorId ?? "preset",
        }));
        localStorage.setItem(KEY, JSON.stringify(seeded));
        setItems(seeded);
      }
    } catch { setItems(stripTest(INITIAL_REVIEWS as any)); }
  }, [stripTest]);

  const add = useCallback((review: any) => {
    setItems((prev: any[]) => {
      const item = { id: Date.now(), createdAt: new Date().toISOString(), authorId: clientId, ...review };
      const next = [item, ...prev];
      const cleaned = stripTest(next);
      try { localStorage.setItem(KEY, JSON.stringify(cleaned)); } catch {}
      return cleaned;
    });
  }, [stripTest, clientId]);

  const remove = useCallback((id: any) => {
    if (!id) return;
    setItems((prev: any[]) => {
      const next = prev.filter((it: any) => it.id !== id);
      const cleaned = stripTest(next);
      try { localStorage.setItem(KEY, JSON.stringify(cleaned)); } catch {}
      return cleaned;
    });
  }, [stripTest]);

  const update = useCallback((id: any, patch: any) => {
    if (!id) return;
    setItems((prev: any[]) => {
      const next = prev.map((it: any) => (it.id === id ? { ...it, ...patch } : it));
      const cleaned = stripTest(next);
      try { localStorage.setItem(KEY, JSON.stringify(cleaned)); } catch {}
      return cleaned;
    });
  }, [stripTest]);

  useEffect(() => {
    try {
      (window as any).somov_admin_on = () => { localStorage.setItem(OWNER_KEY, "1"); alert("Admin mode ON. Reload page."); };
      (window as any).somov_admin_off = () => { localStorage.removeItem(OWNER_KEY); alert("Admin mode OFF. Reload page."); };
    } catch {}
  }, []);

  return { items, add, remove, update, clientId, isOwner };
}

function ReviewForm({ onSubmit }: { onSubmit: (r: any) => void }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const readAsDataURL = (f: File) => new Promise<string>((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result));
    fr.onerror = rej;
    fr.readAsDataURL(f);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setOk("");
    const nm = sanitize(name).trim();
    const tx = sanitize(text).trim();
    if (nm.length < 2) return setError("Укажите имя (мин. 2 символа)");
    if (tx.length < 10) return setError("Отзыв слишком короткий (мин. 10 символов)");

    let media: any = null;
    if (file) {
      const allowed = /^(image|video)\//.test(file.type);
      const max = 4 * 1024 * 1024;
      if (!allowed) return setError("Поддерживаются только изображения и видео");
      if (file.size > max) return setError("Файл слишком большой (до 4 МБ)");
      try { media = { name: file.name, type: file.type, size: file.size, url: await readAsDataURL(file) }; }
      catch { return setError("Не удалось прочитать файл"); }
    }

    onSubmit({ name: nm, text: tx, media });
    setName(""); setText(""); setFile(null); setOk("Спасибо! Ваш отзыв добавлен.");
  };

  return (
    <form id="review-form" onSubmit={handleSubmit} className="mt-6 p-6 rounded-2xl border border-neutral-800 bg-neutral-900">
      <div className="grid gap-3">
        <div className="flex items-center gap-2 text-sm text-neutral-400"><User className="w-4 h-4" /> Оставьте отзыв <span className="text-neutral-500">(при желании прикрепите изображение или видео)</span></div>
        <input value={name} onChange={(e) => setName(e.target.value)} className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-600" placeholder="Ваше имя" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Ваш отзыв" className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-600" />
        <div>
          <input type="file" accept="image/*,video/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} className="block w-full text-sm text-neutral-300 file:mr-3 file:rounded-xl file:border file:border-neutral-700 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-neutral-200 hover:file:border-neutral-500" />
          <div className="mt-1 text-xs text-neutral-500">Поддерживаются изображения/видео до ~4 МБ. Файл прикрепляется к отзыву.</div>
          {file && <div className="mt-1 text-xs text-neutral-400 truncate">Выбрано: {file.name}</div>}
        </div>
        {error && <div className="text-rose-400 text-sm">{error}</div>}
        {ok && <div className="text-emerald-400 text-sm">{ok}</div>}
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-2xl bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50 transition-transform hover:-translate-y-0.5">Отправить отзыв</button>
        </div>
      </div>
    </form>
  );
}

function ReviewsList({ items, clientId, isOwner, onDelete, onEdit }: any) {
  const [showAll, setShowAll] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const [delId, setDelId] = useState<any>(null);

  useEffect(() => {
    if (!(edit || delId)) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setEdit(null); setDelId(null); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [edit, delId]);

  if (!items?.length) return <p className="mt-6 text-neutral-400" id="reviews-list">Пока нет отзывов — станьте первым! 🙂</p>;
  const visible = showAll ? items : items.slice(0, 6);

  return (
    <>
      <div id="reviews-list" className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visible.map((r: any) => {
          const canManage = isOwner || r.authorId === clientId;
          return (
            <div key={r.id} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 h-full flex flex-col">
              <div className="text-sm text-neutral-400">{formatDate(r.createdAt)}</div>
              <h3 className="mt-1 font-semibold text-neutral-100">{r.name}</h3>
              <p className="mt-2 text-neutral-300 whitespace-pre-wrap">{r.text}</p>
              {r.media?.url && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/40">
                  {r.media.type?.startsWith("image/") ? (
                    <img src={r.media.url} alt={r.media.name || "вложение"} className="w-full h-auto object-cover" />
                  ) : r.media.type?.startsWith("video/") ? (
                    <video src={r.media.url} controls className="w-full h-auto" />
                  ) : null}
                  <div className="px-3 py-2 text-xs text-neutral-400 border-t border-neutral-800 truncate">{r.media.name || "вложение"}</div>
                </div>
              )}
              <a href={TELEGRAM_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">Источник: Telegram <ExternalLink className="w-3.5 h-3.5" /></a>
              {canManage && (
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => setEdit({ id: r.id, name: r.name, text: r.text })} className="px-2 py-1 text-xs rounded-md bg-neutral-800 border border-neutral-700 hover:border-neutral-600">Редактировать</button>
                  <button type="button" onClick={() => setDelId(r.id)} className="px-2 py-1 text-xs rounded-md bg-rose-600/20 text-rose-300 border border-rose-700/50 hover:bg-rose-600/30">Удалить</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {items.length > 6 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-4 py-2 rounded-2xl bg-neutral-900 text-white font-medium ring-1 ring-neutral-700 hover:ring-neutral-500 transition"
            aria-expanded={showAll}
            aria-controls="reviews-list"
          >
            {showAll ? "Свернуть" : `Посмотреть ещё (${items.length - 6})`}
          </button>
        </div>
      )}

      {/* Modal: edit */}
      {edit && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm grid place-items-center" onClick={() => setEdit(null)}>
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-700 p-5" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-semibold text-neutral-100">Редактировать отзыв</h4>
            <div className="mt-3 grid gap-3">
              <input value={edit.name} onChange={(e) => setEdit((s: any) => ({ ...s, name: e.target.value }))} className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-600" placeholder="Имя" />
              <textarea value={edit.text} onChange={(e) => setEdit((s: any) => ({ ...s, text: e.target.value }))} rows={4} className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-600" placeholder="Отзыв" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEdit(null)} className="px-3 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 hover:border-neutral-500">Отмена</button>
                <button type="button" onClick={() => { const name = sanitize(edit.name).trim(); const text = sanitize(edit.text).trim(); if (name && text) { onEdit(edit.id, { name, text }); setEdit(null); } }} className="px-3 py-1.5 rounded-xl bg-violet-600 text-white ring-1 ring-violet-500/50">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: delete */}
      {delId && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm grid place-items-center" onClick={() => setDelId(null)}>
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-700 p-5" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-semibold text-neutral-100">Удалить отзыв?</h4>
            <p className="mt-2 text-neutral-300 text-sm">Действие нельзя отменить.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setDelId(null)} className="px-3 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 hover:border-neutral-500">Отмена</button>
              <button type="button" onClick={() => { onDelete(delId); setDelId(null); }} className="px-3 py-1.5 rounded-xl bg-rose-600 text-white ring-1 ring-rose-500/50">Удалить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DevTests() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const run = useCallback(() => {
    const rs: any[] = [];
    const mustIds = ["#home", "#reviews", "#services", "#portfolio", "#contact"];
    rs.push({ name: "Секции существуют", pass: mustIds.every((i) => !!document.querySelector(i)) });
    rs.push({ name: "Кнопка оставить отзыв существует", pass: !!document.querySelector("#leave-review-btn") });
    rs.push({ name: "Список отзывов существует", pass: !!document.querySelector("#reviews-list") });
    const cards = document.querySelectorAll("#reviews-list > div");
    rs.push({ name: "Загружено ≥ 6 отзывов", pass: (cards?.length || 0) >= 6 });
    const tele = document.querySelector('a[href="https://t.me/Somov2k03"]');
    rs.push({ name: "Ссылка на Telegram существует", pass: !!tele });
    const menuLink = document.querySelector('a[href="#portfolio"]');
    rs.push({ name: "Якорь на Портфолио присутствует", pass: !!menuLink });
    setResults(rs);
  }, []);
  useEffect(() => { run(); }, [run]);
  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      <button onClick={() => setOpen((v) => !v)} className="px-3 py-1.5 rounded-xl text-xs bg-neutral-800 text-neutral-200 border border-neutral-700">
        {open ? "Скрыть тесты" : "Показать тесты"}
      </button>
      {open && (
        <div className="mt-2 w-64 rounded-2xl border border-neutral-700 bg-neutral-900/95 p-3 text-xs text-neutral-200 shadow-xl">
          <div className="font-semibold mb-1">Проверки</div>
          <ul className="space-y-1">
            {results.map((r, i) => (
              <li key={i} className={r.pass ? "text-emerald-400" : "text-rose-400"}>• {r.name} — {r.pass ? "OK" : "FAIL"}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ParallaxBlobs() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobsRef = useRef<Array<HTMLDivElement | null>>([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const config = useRef(Array.from({ length: 12 }).map(() => ({
    size: 340 + Math.round(Math.random() * 360),
    opacity: 0.14 + Math.random() * 0.16,
    blur: 72 + Math.round(Math.random() * 60),
    baseX: 8 + Math.random() * 84,
    baseY: 6 + Math.random() * 88,
    kx: 18 + Math.random() * 24,
    ky: 18 + Math.random() * 24,
    hue: 260 + Math.round(Math.random() * 20),
    hueAmp: 14 + Math.random() * 18,
    hueSpeed: 0.2 + Math.random() * 0.6,
    orbR: 20 + Math.random() * 60,
    orbSpeed: 0.15 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    phase2: Math.random() * Math.PI * 2,
  }))).current;

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointerRef.current = { x: (e.clientX / w) * 2 - 1, y: (e.clientY / h) * 2 - 1 };
    };
    const onScroll = () => { scrollRef.current = window.scrollY || 0; };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const ptr = pointerRef.current; const sy = scrollRef.current; const t = performance.now() * 0.001;
      blobsRef.current.forEach((el, i) => {
        if (!el) return; const c = (config as any)[i];
        const baseTx = ptr.x * c.kx + ((sy * 0.04) % 80);
        const baseTy = ptr.y * c.ky + ((sy * 0.06) % 80);
        const ox = Math.cos(t * c.orbSpeed + c.phase) * c.orbR;
        const oy = Math.sin(t * c.orbSpeed * 0.9 + c.phase2) * c.orbR;
        const scale = 0.98 + 0.04 * Math.sin(t * c.orbSpeed * 0.7 + c.phase);
        el.style.transform = `translate(-50%, -50%) translate3d(${(baseTx + ox) | 0}px, ${(baseTy + oy) | 0}px, 0) scale(${scale.toFixed(3)})`;
        const hue = c.hue + Math.sin(t * c.hueSpeed + c.phase) * c.hueAmp;
        el.style.background = `radial-gradient(circle at 50% 50%, hsl(${hue} 95% 62% / 0.95) 0%, hsl(${hue} 90% 55% / 0.50) 35%, transparent 70%)`;
      });
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [config]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900" />
      {config.map((c, i) => (
        <div
          key={i}
          ref={(el) => { blobsRef.current[i] = el; }}
          style={{
            position: "absolute",
            width: c.size,
            height: c.size,
            left: `${c.baseX}%`,
            top: `${c.baseY}%`,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            filter: `blur(${c.blur}px)`,
            opacity: c.opacity,
            background: `radial-gradient(circle at 50% 50%, hsl(${c.hue} 95% 62% / 0.95) 0%, hsl(${c.hue} 90% 55% / 0.5) 35%, transparent 70%)`,
            pointerEvents: "none",
            willChange: "transform, background",
            mixBlendMode: "normal",
          }}
        />
      ))}
    </div>
  );
}

function TiltPhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-10 -z-10 blur-3xl opacity-40" style={{
        background:
          "radial-gradient(50% 50% at 20% 30%, rgba(147,51,234,.22), transparent 60%)," +
          "radial-gradient(60% 60% at 80% 70%, rgba(217,70,239,.18), transparent 60%)",
      }} />
      <div className="rounded-[18px] p-px bg-gradient-to-br from-violet-500/70 via-fuchsia-500/60 to-violet-600/70 shadow-lg shadow-violet-800/5">
        <div className="relative overflow-hidden rounded-[17px] bg-neutral-900/50 shadow-xl" style={{ transform: "rotateX(2deg) rotateY(-3deg)", transformStyle: "preserve-3d" }}>
          <img src={src} alt={alt} className="block w-full h-full object-cover aspect-[3/4] select-none" draggable={false} />
          <div className="pointer-events-none absolute inset-0 rounded-[17px] ring-1 ring-neutral-900/30" />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPreview() {
  const [open, setOpen] = useState(false);
  const scrollTo = useSmoothScroll();
  const { items: reviews, add, remove, update, clientId, isOwner } = useReviews();
  const [pfTab, setPfTab] = useState("Дизайн");

  return (
    <>
      <ParallaxBlobs />
      <div className="relative z-20 min-h-screen text-neutral-100 scroll-smooth">
        <DevTests />

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="font-bold text-xl sm:text-2xl tracking-tight">Somov Production</a>

            <nav className="hidden md:flex items-center gap-6">
              {MENU.map((item) => (
                <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); scrollTo(item.href); }} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">{item.label}</a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="group px-4 py-2 rounded-2xl bg-violet-600 text-white font-medium shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50 transition-transform hover:-translate-y-0.5">
                Связаться <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <button className="md:hidden p-2 rounded-xl border border-neutral-800 hover:bg-neutral-900" onClick={() => setOpen((v) => !v)} aria-label="Открыть меню">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {/* Mobile menu */}
          {open && (
            <div className="md:hidden border-t border-neutral-800 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-4 py-2 grid gap-1">
                {MENU.map((item) => (
                  <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); setOpen(false); scrollTo(item.href); }} className="px-2 py-3 rounded-lg hover:bg-neutral-900 text-base font-medium text-neutral-300">{item.label}</a>
                ))}
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="mt-2 px-3 py-3 rounded-2xl bg-violet-600 text-white font-medium text-center">Связаться</a>
              </div>
            </div>
          )}
        </header>

        {/* Hero */}
        <section id="home" className="scroll-mt-28 sm:scroll-mt-24 mx-auto max-w-6xl px-4 py-14 sm:py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-400">Добро пожаловать на мой сайт — Somov Production</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight"><span className="underline decoration-4 decoration-violet-600 underline-offset-8">Somov Production</span></h1>
              <p className="mt-4 text-neutral-300 text-base sm:text-lg">Я — Никита, увлечённый дизайном человек, готовый превратить ваши идеи в визуальные шедевры.</p>
              <div className="mt-5 text-neutral-300">
                <p className="font-semibold text-neutral-200">Почему именно я:</p>
                <ul className="mt-2 space-y-2 text-sm sm:text-base">
                  <li className="flex items-center gap-2"><ShinyStar /> <span>Опыт работы более 4 лет</span></li>
                  <li className="flex items-center gap-2"><ShinyStar /> <span>Соблюдаю дедлайны</span></li>
                  <li className="flex items-center gap-2"><ShinyStar /> <span>Постоянно актуализирую свои знания, поэтому ваш продукт будет в тренде</span></li>
                  <li className="flex items-center gap-2"><ShinyStar /> <span>Всегда на связи</span></li>
                  <li className="flex items-center gap-2"><ShinyStar /> <span>Понимаю пожелания и сосредоточен на достижении целей клиента</span></li>
                </ul>
                <p className="mt-3 text-sm sm:text-base">Доверьтесь моему креативному подходу, чувству стиля и ваши проекты оживут в мире уникального дизайна!</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollTo("#portfolio"); }} className="group px-4 py-2 rounded-2xl bg-neutral-900 text-white font-medium ring-1 ring-neutral-700 hover:ring-neutral-500 transition-transform hover:-translate-y-0.5">
                  Смотреть портфолио <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="group px-4 py-2 rounded-2xl bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50 transition-transform hover:-translate-y-0.5">
                  Связаться в Telegram <Send className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
            <TiltPhotoCard src={HERO_PHOTO} alt="Никита — Somov Production" />
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="scroll-mt-28 sm:scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Отзывы</h2>
            <a href={TELEGRAM_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-400 hover:text-violet-300 inline-flex items-center gap-1">Все отзывы в Telegram <ExternalLink className="w-4 h-4" /></a>
          </div>
          <p className="mt-2 text-neutral-400 text-sm">Свой отзыв о моей работе вы можете оставить в Telegram.</p>
          <a id="leave-review-btn" href={TELEGRAM_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50">Оставить отзыв в Telegram <ExternalLink className="w-4 h-4" /></a>
          {/* Локальная форма (при желании можно показать) */}
          {/* <ReviewForm onSubmit={add} /> */}
          <ReviewsList items={reviews} clientId={clientId} isOwner={isOwner} onDelete={(id: any)=>remove(id)} onEdit={(id: any,patch: any)=>update(id,patch)} />
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-28 sm:scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Услуги</h2>
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-600 text-white font-medium shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50 transition-transform hover:-translate-y-0.5">Написать в Telegram</a>
          </div>
          <p className="mt-2 text-neutral-400 text-sm">Что я могу вам предложить <span className="text-neutral-400/90">(Работаю по предоплате — 50% от стоимости проекта)</span>:</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900 flex flex-col h-full">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                {s.desc && <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>}
                {Array.isArray(s.variants) && s.variants.length > 0 && (
                  <ul className="mt-3 text-sm text-neutral-300 space-y-2">
                    {s.variants.map((v, vi) => (
                      <li key={vi} className="flex items-center justify-between gap-3"><span className="truncate">• {v.name}</span><span className="shrink-0 text-neutral-200 font-medium">{v.price}</span></li>
                    ))}
                  </ul>
                )}
                {Array.isArray(s.features) && s.features.length > 0 && (
                  <ul className="mt-3 text-sm text-neutral-300 list-disc pl-4 space-y-1">
                    {s.features.map((f, fi) => (<li key={fi}>{f}</li>))}
                  </ul>
                )}
                <div className="mt-auto">
                  <div className="min-h-4" />
                  <div className="pt-4 border-t border-neutral-800">
                    <div className="flex items-center justify-between"><span className="text-xl font-semibold">{s.priceText || "цена по запросу"}</span></div>
                    {s.note && <p className="mt-2 text-xs text-neutral-400">{s.note}</p>}
                    <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center w-full px-4 py-2 rounded-2xl bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50 transition-transform hover:-translate-y-0.5">Написать в Telegram</a>
                    <p className="mt-2 text-xs text-neutral-400 text-center">Есть вопросы или нужны уточнения? Напишите — отвечу быстро.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="scroll-mt-28 sm:scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Портфолио</h2>
              <div className="mt-2">
                {pfTab === "Дизайн" ? (
                  <a href={TELEGRAM_PORTFOLIO_DESIGN} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-400 hover:text-violet-300 inline-flex items-center gap-1">Все работы по дизайну в Telegram <ExternalLink className="w-4 h-4" /></a>
                ) : (
                  <a href={TELEGRAM_PORTFOLIO_VIDEO} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-400 hover:text-violet-300 inline-flex items-center gap-1">Все работы по видео в Telegram <ExternalLink className="w-4 h-4" /></a>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {PORTFOLIO_TABS.map((tab) => (
                  <button key={tab} onClick={() => setPfTab(tab)} className={`px-3 py-1.5 rounded-xl text-sm border ${pfTab === tab ? "bg-violet-600 text-white border-violet-500" : "bg-neutral-900 text-neutral-200 border-neutral-700 hover:border-neutral-500"}`}>{tab}</button>
                ))}
              </div>
              <div className="mt-6">
                <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900">
                  <p className="text-neutral-300">Нажмите кнопку ниже — откроется моё портфолио в Telegram.</p>
                  <a href={pfTab === "Дизайн" ? TELEGRAM_PORTFOLIO_DESIGN : TELEGRAM_PORTFOLIO_VIDEO} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50">Открыть {pfTab.toLowerCase()} в Telegram <ExternalLink className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section id="contact" className="scroll-mt-28 sm:scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Контакты</h2>
          <p className="mt-2 text-neutral-300">Самый быстрый способ связи — Telegram.</p>
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/20 ring-1 ring-violet-500/50">Написать в Telegram <ArrowRight className="w-4 h-4" /></a>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-neutral-500 border-t border-neutral-800">
          <div className="max-w-6xl mx-auto px-4">© {new Date().getFullYear()} Somov Production. Сделано с любовью к дизайну.</div>
        </footer>
      </div>
    </>
  );
}
