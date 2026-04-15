"use client";

import * as React from "react";
import { Lock } from "lucide-react";

interface ProposalGateProps {
  user: string;
  pass: string;
  storageKey: string;
  title: string;
  children: React.ReactNode;
}

export function ProposalGate({
  user,
  pass,
  storageKey,
  title,
  children,
}: ProposalGateProps) {
  // null = hydration pending; true/false once read from sessionStorage
  const [unlocked, setUnlocked] = React.useState<boolean | null>(null);
  const [u, setU] = React.useState("");
  const [p, setP] = React.useState("");
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    setUnlocked(
      typeof window !== "undefined" &&
        window.sessionStorage.getItem(storageKey) === "1"
    );
  }, [storageKey]);

  if (unlocked) return <>{children}</>;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (u.trim() === user && p === pass) {
      window.sessionStorage.setItem(storageKey, "1");
      setUnlocked(true);
    } else {
      setErr(true);
    }
  };

  return (
    <>
      {/* page peeks through behind the mask */}
      <div
        aria-hidden
        className="pointer-events-none select-none"
      >
        {children}
      </div>

      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-6">
        {/* 80% mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-background/80 backdrop-blur-md"
        />
        {/* decorative blurred pink blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-pink-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-3xl"
        />

        <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm border border-border bg-card p-8 shadow-2xl"
      >
        <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-500/30 bg-pink-500/10">
          <Lock className="h-4 w-4 text-pink-500" strokeWidth={1.5} />
        </div>
        <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-pink-500">
          Proposta privada
        </div>
        <h2 className="mt-3 text-2xl font-light tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Digite suas credenciais para visualizar.
        </p>

        <div className="mt-6 space-y-3">
          <input
            autoFocus
            autoComplete="username"
            value={u}
            onChange={(e) => {
              setU(e.target.value);
              setErr(false);
            }}
            placeholder="Usuário"
            className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-pink-500"
          />
          <input
            type="password"
            autoComplete="current-password"
            value={p}
            onChange={(e) => {
              setP(e.target.value);
              setErr(false);
            }}
            placeholder="Senha"
            className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-pink-500"
          />
        </div>

        {err ? (
          <p className="mt-3 text-xs text-pink-500">Credenciais inválidas.</p>
        ) : null}

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
        >
          Entrar
        </button>
      </form>
      </div>
    </>
  );
}
