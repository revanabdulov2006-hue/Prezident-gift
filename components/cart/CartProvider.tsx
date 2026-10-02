"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { bySlug } from "@/content/products";
import { priceOf } from "@/content/prices";

const STORAGE_KEY = "president-cart-v1";
const MAX_QTY = 99;

export interface CartLine {
  slug: string;
  qty: number;
}

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; slug: string; qty: number }
  | { type: "set"; slug: string; qty: number }
  | { type: "remove"; slug: string }
  | { type: "clear" };

const clamp = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.round(n)));

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const hit = lines.find((l) => l.slug === action.slug);
      if (hit) {
        return lines.map((l) =>
          l.slug === action.slug ? { ...l, qty: clamp(l.qty + action.qty) } : l,
        );
      }
      return [...lines, { slug: action.slug, qty: clamp(action.qty) }];
    }
    case "set":
      return action.qty < 1
        ? lines.filter((l) => l.slug !== action.slug)
        : lines.map((l) =>
            l.slug === action.slug ? { ...l, qty: clamp(action.qty) } : l,
          );
    case "remove":
      return lines.filter((l) => l.slug !== action.slug);
    case "clear":
      return [];
  }
}

/** localStorage-dən gələn məlumata etibar edilmir: yalnız mövcud məhsullar qalır. */
function sanitize(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: CartLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { slug, qty } = item as Record<string, unknown>;
    if (typeof slug !== "string" || typeof qty !== "number") continue;
    if (seen.has(slug) || !bySlug(slug) || priceOf(slug) === null) continue;
    seen.add(slug);
    out.push({ slug, qty: clamp(qty) });
  }
  return out;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** localStorage oxunana qədər false. Boş səbət görüntüsünün yanıb-sönməsinin qarşısını alır. */
  ready: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (slug: string, qty?: number, opts?: { openDrawer?: boolean }) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart yalnız CartProvider daxilində işləyir");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // İlk yükləmədə saxlanmış səbəti oxu.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: sanitize(JSON.parse(raw)) });
    } catch {
      // Brauzer saxlama qadağandırsa, səbət yalnız sessiya boyu işləyir.
    }
    setReady(true);
  }, []);

  // Dəyişiklikləri yaz. Oxuma bitməmiş yazmaq saxlanmış səbəti silərdi.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* eyni səbəb */
    }
  }, [lines, ready]);

  // Başqa tabda dəyişəndə sinxron saxla.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        dispatch({
          type: "hydrate",
          lines: e.newValue ? sanitize(JSON.parse(e.newValue)) : [],
        });
      } catch {
        /* zədələnmiş qeyd, nəzərə alınmır */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const add = useCallback<CartContextValue["add"]>((slug, qty = 1, opts) => {
    if (!bySlug(slug) || priceOf(slug) === null) return;
    dispatch({ type: "add", slug, qty });
    if (opts?.openDrawer !== false) setDrawerOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + (priceOf(l.slug) ?? 0) * l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      ready,
      drawerOpen,
      openDrawer,
      closeDrawer,
      add,
      setQty: (slug, qty) => dispatch({ type: "set", slug, qty }),
      remove: (slug) => dispatch({ type: "remove", slug }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines, ready, drawerOpen, openDrawer, closeDrawer, add]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
