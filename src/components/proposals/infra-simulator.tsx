"use client";

import React, { useState, useMemo } from "react";
import { X } from "lucide-react";

/* ================================================================
   DATA
   ================================================================ */

const STORAGE_PROVIDERS: Record<string, any> = {
  aws_s3: { name: "AWS S3 Standard", storage: 0.023, egress: 0.09, freeEgressGB: 100, putPer1k: 0.005, getPer1k: 0.0004, durability: "11 nines", regions: 33, color: "#FF9900" },
  cloudflare_r2: { name: "Cloudflare R2", storage: 0.015, egress: 0, freeEgressGB: Infinity, putPer1k: 0.0045, getPer1k: 0.00036, durability: "11 nines", regions: "Edge (330+)", color: "#F38020" },
  backblaze_b2: { name: "Backblaze B2", storage: 0.006, egress: 0.01, freeEgressMultiplier: 3, putPer1k: 0.004, getPer1k: 0.0004, durability: "11 nines", regions: 4, color: "#E8140C" },
  do_spaces: { name: "DigitalOcean Spaces", storage: 0.02, egress: 0.01, freeEgressGB: 1024, baseFee: 5, baseIncluded: 250, putPer1k: 0, getPer1k: 0, durability: "Not published", regions: 9, color: "#0080FF" },
  azure_blob: { name: "Azure Blob Hot", storage: 0.0184, egress: 0.0865, freeEgressGB: 100, putPer1k: 0.0055, getPer1k: 0.0044, durability: "11-16 nines", regions: 60, color: "#0078D4" },
};

const BACKUP_OPTIONS: Record<string, any> = {
  s3_glacier: { name: "AWS S3 Glacier Instant", storage: 0.004, retrieval: 0.03, color: "#FF9900" },
  s3_deep: { name: "AWS S3 Glacier Deep Archive", storage: 0.00099, retrieval: 0.02, color: "#cc7700" },
  b2_backup: { name: "Backblaze B2 (cross-account)", storage: 0.006, retrieval: 0, color: "#E8140C" },
  r2_ia: { name: "Cloudflare R2 Infrequent Access", storage: 0.01, retrieval: 0.01, color: "#F38020" },
};

const INFRA_COMPONENTS: Record<string, any> = {
  frontend: { name: "Frontend Hosting", options: { vercel_pro: { label: "Vercel Pro", formula: () => 20, note: "$20/seat" }, cloudflare_pages: { label: "Cloudflare Pages", formula: () => 0, note: "Free" }, netlify_pro: { label: "Netlify Pro", formula: () => 19, note: "$19/mo" } } },
  backend: { name: "API Backend", options: { railway: { label: "Railway", formula: (pg: number) => pg <= 50 ? 20 : pg <= 200 ? 80 : pg <= 500 ? 250 : pg <= 1000 ? 500 : 1200, note: "Managed containers" }, aws_ecs: { label: "AWS ECS Fargate", formula: (pg: number) => pg <= 50 ? 60 : pg <= 200 ? 200 : pg <= 500 ? 500 : pg <= 1000 ? 1000 : 2500, note: "2-4 vCPU" }, hetzner: { label: "Hetzner VPS", formula: (pg: number) => pg <= 50 ? 15 : pg <= 200 ? 50 : pg <= 500 ? 150 : pg <= 1000 ? 350 : 800, note: "Self-managed" } } },
  database: { name: "Primary Database", options: { supabase_pro: { label: "Supabase Pro", formula: (pg: number) => 25 + (pg > 500 ? (pg - 500) * 0.1 : 0), note: "Postgres + auth" }, neon: { label: "Neon", formula: (pg: number) => pg <= 100 ? 19 : pg <= 500 ? 69 : pg <= 1000 ? 200 : 500, note: "Serverless PG" }, aws_rds: { label: "AWS RDS", formula: (pg: number) => pg <= 50 ? 120 : pg <= 200 ? 300 : pg <= 500 ? 600 : pg <= 1000 ? 1200 : 2800, note: "Multi-AZ HA" } } },
  cache: { name: "Cache + Queue", options: { upstash: { label: "Upstash", formula: (pg: number) => pg <= 100 ? 10 : pg <= 500 ? 40 : pg <= 2000 ? 150 : 400, note: "Serverless Redis" }, aws_elasticache: { label: "AWS ElastiCache", formula: (pg: number) => pg <= 100 ? 50 : pg <= 500 ? 150 : pg <= 2000 ? 400 : 900, note: "Managed Redis" } } },
  imaging: { name: "Image Processing", options: { cloudflare_images: { label: "CF Images", formula: (_pg: number, photos: number) => 5 + (photos / 1000) * 0.5, note: "$5 + $0.50/1k" }, bunny_optim: { label: "Bunny Optimizer", formula: (_pg: number, photos: number) => 9.5 + (photos / 1000) * 0.05, note: "$9.50 + $0.05/1k" } } },
  auth: { name: "Authentication", options: { bundled: { label: "Bundled", formula: () => 0, note: "Included in DB" }, clerk: { label: "Clerk Pro", formula: (pg: number) => 25 + Math.max(0, (pg * 10 - 10000) / 1000 * 20), note: "$25 + $0.02/MAU" } } },
  email: { name: "Email", options: { resend: { label: "Resend", formula: (pg: number) => pg <= 100 ? 20 : pg <= 500 ? 35 : pg <= 2000 ? 90 : 300, note: "Dev-friendly" }, ses: { label: "AWS SES", formula: (pg: number) => Math.max(5, pg * 0.01), note: "$0.10/1k emails" } } },
  monitoring: { name: "Monitoring", options: { sentry_team: { label: "Sentry + BetterStack", formula: (pg: number) => pg <= 200 ? 55 : pg <= 1000 ? 160 : 400, note: "Errors + uptime" }, axiom_cf: { label: "Axiom + CF Analytics", formula: (pg: number) => pg <= 200 ? 25 : pg <= 1000 ? 95 : 250, note: "Cheap logs" } } },
  payments: { name: "Payments", options: { stripe: { label: "Stripe (2.9%)", formula: (_pg: number, _photos: number, rev: number) => rev * 0.029, note: "2.9% + $0.30" }, lemonsqueezy: { label: "LemonSqueezy (5%)", formula: (_pg: number, _photos: number, rev: number) => rev * 0.05, note: "MoR, handles tax" } } },
  security: { name: "DNS + WAF", options: { cloudflare_pro: { label: "Cloudflare Pro", formula: () => 20, note: "WAF + DDoS" }, cloudflare_biz: { label: "Cloudflare Biz", formula: () => 200, note: "Advanced WAF" } } },
};

const PRESETS: Record<string, any> = {
  unlimited: { name: "Unlimited RAW", description: "Full-res RAW delivery", avgPhotoMB: 35, photosPerClient: 400, clientsPerPhotographer: 25, monthlyViewsPerPhoto: 4, downloadRatio: 0.15, monthlyGrowthPct: 8, retentionMonths: 24, pricePerPhotographer: 49 },
  limited_basic: { name: "Limited JPEG (basic)", description: "Compressed deliverables", avgPhotoMB: 2.5, photosPerClient: 200, clientsPerPhotographer: 15, monthlyViewsPerPhoto: 6, downloadRatio: 0.10, monthlyGrowthPct: 5, retentionMonths: 12, pricePerPhotographer: 15 },
  limited_premium: { name: "Limited JPEG (premium)", description: "High-res web deliverables", avgPhotoMB: 8, photosPerClient: 300, clientsPerPhotographer: 20, monthlyViewsPerPhoto: 5, downloadRatio: 0.12, monthlyGrowthPct: 6, retentionMonths: 18, pricePerPhotographer: 29 },
};

const BACKUP_STRATEGIES: Record<string, any> = {
  none: { name: "None (risky)", multiplier: 0, description: "Single provider, no backup." },
  cross_region: { name: "Cross-region replication", multiplier: 1.0, description: "Full copy in a second region." },
  cross_cloud_cold: { name: "3-2-1: Cross-cloud cold", multiplier: 1.0, description: "Primary hot + second provider cold.", useBackupTier: true },
  full_redundancy: { name: "Hot + Hot + Cold", multiplier: 2.0, description: "Live mirror + cold archive.", useBackupTier: true },
};

/* ================================================================
   CALCULATIONS
   ================================================================ */

function calculateStorage(photographers: number, scenario: any, providerKey: string, backupKey: string, backupTierKey: string) {
  const p = STORAGE_PROVIDERS[providerKey];
  const backup = BACKUP_STRATEGIES[backupKey];
  const backupProv = BACKUP_OPTIONS[backupTierKey];
  const photosPerPg = scenario.photosPerClient * scenario.clientsPerPhotographer;
  const totalPhotos = photographers * photosPerPg;
  const storageGB = (totalPhotos * scenario.avgPhotoMB) / 1024;
  const totalStorageGB = storageGB * 1.15;
  const monthlyViews = totalPhotos * scenario.monthlyViewsPerPhoto;
  const viewEgressGB = (monthlyViews * 0.2) / 1024;
  const downloadEgressGB = (totalPhotos * scenario.downloadRatio * scenario.avgPhotoMB) / 1024;
  const totalEgressGB = viewEgressGB + downloadEgressGB;
  const monthlyUploads = totalPhotos * (scenario.monthlyGrowthPct / 100);
  const monthlyGets = monthlyViews + totalPhotos * scenario.downloadRatio;
  let primaryStorageCost = providerKey === "do_spaces" ? p.baseFee + Math.max(0, totalStorageGB - p.baseIncluded) * p.storage : totalStorageGB * p.storage;
  let egressCost = 0;
  if (providerKey === "aws_s3") egressCost = totalEgressGB * 0.085;
  else if (providerKey === "azure_blob") egressCost = totalEgressGB * 0.081;
  const requestCost = (monthlyUploads / 1000) * p.putPer1k + (monthlyGets / 1000) * p.getPer1k;
  let backupStorageCost = 0, backupTransferCost = 0;
  if (backupKey !== "none") {
    if (backup.useBackupTier && backupProv) {
      backupStorageCost = totalStorageGB * backupProv.storage * backup.multiplier;
      const newDataGB = (monthlyUploads * scenario.avgPhotoMB) / 1024;
      backupTransferCost = (providerKey === "cloudflare_r2" || providerKey === "backblaze_b2") ? 0 : newDataGB * 0.02;
    } else {
      backupStorageCost = totalStorageGB * p.storage * backup.multiplier;
      backupTransferCost = ((monthlyUploads * scenario.avgPhotoMB) / 1024) * 0.02;
    }
  }
  return { totalPhotos, totalStorageGB, totalEgressGB, primaryStorageCost, egressCost, requestCost, backupStorageCost, backupTransferCost, totalStorage: primaryStorageCost + egressCost + requestCost + backupStorageCost + backupTransferCost };
}

function calculateInfra(photographers: number, scenario: any, selections: Record<string, string>) {
  const totalPhotos = photographers * scenario.photosPerClient * scenario.clientsPerPhotographer;
  const revenue = photographers * (scenario.pricePerPhotographer || 0);
  const costs: Record<string, { label: string; note: string; cost: number }> = {};
  let total = 0;
  for (const [component, optionKey] of Object.entries(selections)) {
    const opt = INFRA_COMPONENTS[component]?.options[optionKey];
    if (opt) { const cost = opt.formula(photographers, totalPhotos, revenue); costs[component] = { label: opt.label, note: opt.note, cost }; total += cost; }
  }
  return { costs, total, revenue };
}

const BRL_RATE = 4.99;
type Currency = "USD" | "BRL";

function makeFmt(currency: Currency) {
  const rate = currency === "BRL" ? BRL_RATE : 1;
  const prefix = currency === "BRL" ? "R$ " : "$";
  return (n: number) => {
    const v = n * rate;
    if (v >= 1000) return prefix + v.toLocaleString(currency === "BRL" ? "pt-BR" : "en-US", { maximumFractionDigits: 0 });
    if (v >= 10) return prefix + v.toFixed(0);
    if (v >= 1) return prefix + v.toFixed(2);
    if (v > 0) return prefix + v.toFixed(3);
    return prefix + "0";
  };
}

const fmtGB = (gb: number) => gb >= 1024 ? (gb / 1024).toFixed(1) + " TB" : gb.toFixed(1) + " GB";

/* ================================================================
   MODAL WRAPPER (exposed to parent)
   ================================================================ */

export function InfraSimulatorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-background">
      <button
        onClick={onClose}
        className="fixed right-6 top-6 z-[210] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-pink-500 hover:text-pink-500"
        aria-label="Close simulator"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <Simulator />
    </div>
  );
}

/* ================================================================
   MAIN SIMULATOR
   ================================================================ */

function Simulator() {
  const [presetKey, setPresetKey] = useState("unlimited");
  const [photographers, setPhotographers] = useState(100);
  const [scenario, setScenario] = useState(PRESETS.unlimited);
  const [storageProvider, setStorageProvider] = useState("backblaze_b2");
  const [backupStrategy, setBackupStrategy] = useState("cross_cloud_cold");
  const [backupTier, setBackupTier] = useState("s3_glacier");
  const [stack, setStack] = useState<Record<string, string>>({
    frontend: "cloudflare_pages", backend: "railway", database: "supabase_pro",
    cache: "upstash", imaging: "cloudflare_images", auth: "bundled",
    email: "resend", monitoring: "sentry_team", payments: "stripe", security: "cloudflare_pro",
  });
  const [currency, setCurrency] = useState<Currency>("USD");
  const fmt = useMemo(() => makeFmt(currency), [currency]);

  const handlePreset = (key: string) => { setPresetKey(key); setScenario(PRESETS[key]); };
  const setStackItem = (component: string, optionKey: string) => setStack({ ...stack, [component]: optionKey });

  const storage = useMemo(() => calculateStorage(photographers, scenario, storageProvider, backupStrategy, backupTier), [photographers, scenario, storageProvider, backupStrategy, backupTier]);
  const infra = useMemo(() => calculateInfra(photographers, scenario, stack), [photographers, scenario, stack]);
  const totalCost = storage.totalStorage + infra.total;
  const costPerPg = totalCost / photographers;
  const revenue = infra.revenue;
  const margin = revenue - totalCost;
  const marginPct = revenue > 0 ? (margin / revenue) * 100 : 0;

  const scaleRows = useMemo(() => [50, 100, 200, 500, 1000, 2000].map((n) => {
    const s = calculateStorage(n, scenario, storageProvider, backupStrategy, backupTier);
    const i = calculateInfra(n, scenario, stack);
    const t = s.totalStorage + i.total;
    return { photographers: n, storage: s.totalStorage, infra: i.total, total: t, perPg: t / n, revenue: i.revenue, margin: i.revenue - t, marginPct: i.revenue > 0 ? ((i.revenue - t) / i.revenue) * 100 : 0 };
  }), [scenario, storageProvider, backupStrategy, backupTier, stack]);

  const cls = {
    wrap: "mx-auto max-w-[1400px] px-6 py-10 font-sans text-foreground sm:px-8 lg:px-10",
    eyebrow: "font-mono text-[11px] uppercase tracking-[1.5px] text-pink-500/60",
    h1: "mt-6 text-4xl font-extralight leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl",
    subtitle: "mt-4 max-w-[700px] text-sm leading-relaxed text-muted-foreground",
    card: "rounded border border-border bg-card p-5",
    label: "mb-4 font-mono text-[11px] uppercase tracking-[1.5px] text-muted-foreground/60",
    sectionTitle: "mb-6 flex items-baseline gap-4 text-2xl font-extralight tracking-tight",
    sectionNum: "font-mono text-[13px] text-pink-500/80",
    tableHeader: "flex items-center border-b border-border bg-muted/30 px-5 py-3 font-mono text-[11px] uppercase tracking-[1px] text-muted-foreground/60",
    tableRow: "flex items-center border-b border-border/50 px-5 py-3 text-[13px] transition hover:bg-muted/20",
    tableNum: "flex-1 text-right font-mono text-[13px]",
    btn: "w-full cursor-pointer border border-border bg-transparent px-3.5 py-3 text-left text-[13px] text-foreground transition-all",
    btnActive: "border-pink-500 bg-pink-500/10 text-foreground",
    quickBtn: "cursor-pointer border border-border bg-transparent px-2.5 py-1 font-mono text-[11px] text-foreground",
    bigNum: "text-5xl font-extralight italic leading-none text-pink-500",
    accent: "text-pink-500",
  };

  return (
    <div className={cls.wrap}>
      {/* Header */}
      <div className="border-b border-border pb-10">
        <div className="flex items-center justify-between">
          <span className={cls.eyebrow}>Production Infrastructure · Full Stack · Apr 2026</span>
          <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
            <button
              onClick={() => setCurrency("USD")}
              className={`rounded-full px-3 py-1 font-mono text-[11px] font-medium transition ${currency === "USD" ? "bg-pink-500 text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("BRL")}
              className={`rounded-full px-3 py-1 font-mono text-[11px] font-medium transition ${currency === "BRL" ? "bg-pink-500 text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              BRL
            </button>
          </div>
        </div>
        <h1 className={cls.h1}>
          Photo Platform <em className="italic text-pink-500">Total Cost</em>
        </h1>
        <p className={cls.subtitle}>
          Complete production infrastructure modeling: storage, backup, frontend, API, database, image processing, auth, monitoring, payments, and security.
        </p>
        {currency === "BRL" && (
          <p className="mt-2 font-mono text-[11px] text-muted-foreground/50">
            Valores convertidos a R$ {BRL_RATE.toFixed(2)} por dolar
          </p>
        )}
      </div>

      {/* Hero stats */}
      <div className="mt-8 rounded border border-border bg-gradient-to-br from-card to-muted/20 p-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          <HeroStat label="Monthly total" value={fmt(totalCost)} accent big />
          <HeroStat label="Storage + backup" value={fmt(storage.totalStorage)} />
          <HeroStat label="App stack" value={fmt(infra.total)} />
          <HeroStat label="Per photographer" value={fmt(costPerPg) + "/mo"} />
          <HeroStat label="MRR" value={fmt(revenue)} />
          <HeroStat label="Gross margin" value={marginPct >= 0 ? marginPct.toFixed(0) + "%" : "LOSS"} color={margin >= 0 ? "#22c55e" : "#ef4444"} />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Preset */}
        <div className={cls.card}>
          <div className={cls.label}>01 · Plan archetype</div>
          <div className="flex flex-col gap-2">
            {Object.entries(PRESETS).map(([key, p]) => (
              <button key={key} onClick={() => handlePreset(key)} className={`${cls.btn} ${presetKey === key ? cls.btnActive : ""}`}>
                <div className="font-semibold">{p.name}</div>
                <div className="mt-1 text-[11px] opacity-60">{p.description}</div>
                <div className="mt-1 font-mono text-[10px] opacity-40">${p.pricePerPhotographer}/pg/mo</div>
              </button>
            ))}
          </div>
        </div>
        {/* Photographers slider */}
        <div className={cls.card}>
          <div className={cls.label}>02 · Photographers</div>
          <div className={cls.bigNum}>{photographers.toLocaleString()}</div>
          <input type="range" min="10" max="2000" step="10" value={photographers} onChange={(e) => setPhotographers(Number(e.target.value))} className="mt-4 w-full accent-pink-500" />
          <div className="mt-1 flex justify-between font-mono text-[11px] opacity-40"><span>10</span><span>2,000</span></div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[50, 100, 200, 500, 1000].map((n) => <button key={n} onClick={() => setPhotographers(n)} className={cls.quickBtn}>{n}</button>)}
          </div>
          <div className="mt-3 text-[11px] opacity-50">
            {(scenario.clientsPerPhotographer * scenario.photosPerClient).toLocaleString()} photos/pg · {(photographers * scenario.clientsPerPhotographer * scenario.photosPerClient).toLocaleString()} total
          </div>
        </div>
        {/* Tuners */}
        <div className={cls.card}>
          <div className={cls.label}>03 · Per-photographer load</div>
          <Tuner label="Avg photo" value={scenario.avgPhotoMB} unit=" MB" onChange={(v) => setScenario({ ...scenario, avgPhotoMB: v })} min={0.5} max={80} step={0.5} />
          <Tuner label="Photos/client" value={scenario.photosPerClient} unit="" onChange={(v) => setScenario({ ...scenario, photosPerClient: v })} min={50} max={1000} step={10} />
          <Tuner label="Clients/month" value={scenario.clientsPerPhotographer} unit="" onChange={(v) => setScenario({ ...scenario, clientsPerPhotographer: v })} min={1} max={100} step={1} />
          <Tuner label="Views/photo" value={scenario.monthlyViewsPerPhoto} unit="/mo" onChange={(v) => setScenario({ ...scenario, monthlyViewsPerPhoto: v })} min={1} max={30} step={1} />
          <Tuner label="Download rate" value={(scenario.downloadRatio * 100)} unit="%" onChange={(v) => setScenario({ ...scenario, downloadRatio: v / 100 })} min={0} max={50} step={1} />
          <Tuner label="Plan price" value={scenario.pricePerPhotographer} unit="/mo" onChange={(v) => setScenario({ ...scenario, pricePerPhotographer: v })} min={0} max={200} step={1} />
        </div>
      </div>

      {/* Storage + backup */}
      <div className="mt-12">
        <h2 className={cls.sectionTitle}><span className={cls.sectionNum}>04</span>Storage &amp; backup</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className={cls.card}>
            <div className={cls.label}>Primary provider</div>
            <div className="flex flex-col gap-2">
              {Object.entries(STORAGE_PROVIDERS).map(([key, p]) => (
                <button key={key} onClick={() => setStorageProvider(key)} className={`${cls.btn} flex items-center gap-2.5 ${storageProvider === key ? cls.btnActive : ""}`}>
                  <div className="h-8 w-1 rounded-sm" style={{ background: p.color }} />
                  <div><div className="font-semibold">{p.name}</div><div className="mt-0.5 font-mono text-[11px] opacity-50">${p.storage}/GB · {p.durability}</div></div>
                </button>
              ))}
            </div>
          </div>
          <div className={cls.card}>
            <div className={cls.label}>Backup strategy</div>
            <div className="flex flex-col gap-2">
              {Object.entries(BACKUP_STRATEGIES).map(([key, b]) => (
                <button key={key} onClick={() => setBackupStrategy(key)} className={`${cls.btn} ${backupStrategy === key ? cls.btnActive : ""} ${key === "none" ? "border-red-900/40" : ""}`}>
                  <div className={`font-semibold ${key === "none" ? "text-red-400" : ""}`}>{b.name}</div>
                  <div className="mt-1 text-[11px] leading-snug opacity-60">{b.description}</div>
                </button>
              ))}
            </div>
          </div>
          {BACKUP_STRATEGIES[backupStrategy]?.useBackupTier && (
            <div className={cls.card}>
              <div className={cls.label}>Cold backup tier</div>
              <div className="flex flex-col gap-2">
                {Object.entries(BACKUP_OPTIONS).map(([key, b]) => (
                  <button key={key} onClick={() => setBackupTier(key)} className={`${cls.btn} flex items-center gap-2.5 ${backupTier === key ? cls.btnActive : ""}`}>
                    <div className="h-7 w-1 rounded-sm" style={{ background: b.color }} />
                    <div><div className="text-[13px] font-semibold">{b.name}</div><div className="mt-0.5 font-mono text-[11px] opacity-50">${b.storage}/GB</div></div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Storage table */}
        <div className="mt-4 overflow-hidden rounded border border-border bg-card">
          <div className={cls.tableHeader}><div className="flex-[3]">Storage breakdown</div><div className={cls.tableNum}>Monthly</div></div>
          <SRow fmt={fmt} label="Primary storage" detail={`${fmtGB(storage.totalStorageGB)} @ ${STORAGE_PROVIDERS[storageProvider].name}`} amount={storage.primaryStorageCost} />
          <SRow fmt={fmt} label="Egress (CDN)" detail={`${fmtGB(storage.totalEgressGB)}/mo`} amount={storage.egressCost} />
          <SRow fmt={fmt} label="API requests" detail="PUT/GET ops" amount={storage.requestCost} />
          {backupStrategy !== "none" && <>
            <SRow fmt={fmt} label="Backup storage" detail={BACKUP_STRATEGIES[backupStrategy].useBackupTier ? `${fmtGB(storage.totalStorageGB)} @ ${BACKUP_OPTIONS[backupTier]?.name}` : "Cross-region"} amount={storage.backupStorageCost} />
            <SRow fmt={fmt} label="Replication traffic" detail="Daily sync" amount={storage.backupTransferCost} />
          </>}
          <div className="flex items-center bg-muted/30 px-5 py-3 font-semibold">
            <div className="flex-[3] font-serif">Storage subtotal</div>
            <div className="flex-1 text-right font-mono text-base text-pink-500">{fmt(storage.totalStorage)}</div>
          </div>
        </div>
      </div>

      {/* App stack */}
      <div className="mt-12">
        <h2 className={cls.sectionTitle}><span className={cls.sectionNum}>05</span>Application stack</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(INFRA_COMPONENTS).map(([component, def]) => {
            const selected = stack[component];
            const selectedOpt = def.options[selected];
            const cost = selectedOpt?.formula(photographers, storage.totalPhotos, infra.revenue) || 0;
            return (
              <div key={component} className={cls.card}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className={cls.label}>{def.name}</div>
                    <div className="font-serif text-lg">{selectedOpt?.label}</div>
                    <div className="mt-1 text-[11px] opacity-50">{selectedOpt?.note}</div>
                  </div>
                  <div className="font-mono font-semibold text-pink-500">{fmt(cost)}</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {Object.entries(def.options).map(([optKey, opt]: [string, any]) => (
                    <button key={optKey} onClick={() => setStackItem(component, optKey)} className={`cursor-pointer border px-2.5 py-1 text-[11px] transition ${selected === optKey ? "border-pink-500 bg-pink-500 font-semibold text-background" : "border-border bg-transparent text-foreground"}`}>
                      {opt.label.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center rounded border border-border bg-muted/30 px-5 py-4 font-semibold">
          <div className="flex-[3] font-serif">App stack subtotal</div>
          <div className="flex-1 text-right font-mono text-lg text-pink-500">{fmt(infra.total)}</div>
        </div>
      </div>

      {/* Scale projection */}
      <div className="mt-12">
        <h2 className={cls.sectionTitle}><span className={cls.sectionNum}>06</span>Scale &amp; unit economics</h2>
        <div className="overflow-x-auto rounded border border-border bg-card">
          <div className="min-w-[700px]">
            <div className={cls.tableHeader}>
              <div className="flex-1">Photographers</div>
              {["Storage", "App", "Total", "Per pg", "MRR", "Margin", "%"].map((h) => <div key={h} className={cls.tableNum}>{h}</div>)}
            </div>
            {scaleRows.map((r) => (
              <div key={r.photographers} className={`${cls.tableRow} ${r.photographers === photographers ? "border-l-2 border-l-pink-500 bg-pink-500/[0.06]" : ""}`}>
                <div className="flex-1 font-serif font-semibold">{r.photographers.toLocaleString()}</div>
                <div className={cls.tableNum}>{fmt(r.storage)}</div>
                <div className={cls.tableNum}>{fmt(r.infra)}</div>
                <div className={`${cls.tableNum} font-semibold`}>{fmt(r.total)}</div>
                <div className={cls.tableNum}>{fmt(r.perPg)}</div>
                <div className={`${cls.tableNum} opacity-60`}>{fmt(r.revenue)}</div>
                <div className={cls.tableNum} style={{ color: r.margin >= 0 ? "#22c55e" : "#ef4444" }}>{r.margin >= 0 ? fmt(r.margin) : "-" + fmt(-r.margin)}</div>
                <div className={cls.tableNum} style={{ color: r.marginPct >= 60 ? "#22c55e" : r.marginPct >= 0 ? "#ec4899" : "#ef4444", fontWeight: 700 }}>{r.revenue > 0 ? r.marginPct.toFixed(0) + "%" : "—"}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 max-w-[700px] text-[12px] leading-relaxed opacity-50">
          Target SaaS gross margins: 70-80%. Below 40% the unit economics are broken. Adjust plan price or storage provider.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-16 flex justify-between border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[1px] opacity-40">
        <span>Photo Platform Total Cost · Full-stack simulation</span>
        <span>Apr 2026 · v2.0</span>
      </div>
    </div>
  );
}

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

function HeroStat({ label, value, accent, big, color }: { label: string; value: string; accent?: boolean; big?: boolean; color?: string }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[1.5px] opacity-40">{label}</div>
      <div className={`leading-none ${accent ? "italic text-pink-500" : "text-foreground"}`} style={{ fontSize: big ? 42 : 24, fontWeight: big ? 300 : 400, ...(color ? { color } : {}), fontStyle: accent ? "italic" : "normal" }}>{value}</div>
    </div>
  );
}

function SRow({ label, detail, amount, fmt: f }: { label: string; detail: string; amount: number; fmt: (n: number) => string }) {
  return (
    <div className="flex items-center border-b border-border/50 px-5 py-3 transition hover:bg-muted/30">
      <div className="flex-[3]"><div className="font-medium">{label}</div><div className="mt-0.5 text-[11px] opacity-50">{detail}</div></div>
      <div className="flex-1 text-right font-mono text-[13px]">{f(amount)}</div>
    </div>
  );
}

function Tuner({ label, value, unit, onChange, min, max, step }: { label: string; value: number; unit: string; onChange: (v: number) => void; min: number; max: number; step: number }) {
  return (
    <div className="mt-3.5">
      <div className="flex justify-between text-[12px]"><span className="opacity-60">{label}</span><span className="font-mono font-semibold">{value % 1 !== 0 ? value.toFixed(1) : value}{unit}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full accent-pink-500" />
    </div>
  );
}
