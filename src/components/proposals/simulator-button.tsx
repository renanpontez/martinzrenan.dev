"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { InfraSimulatorModal } from "./infra-simulator";

export function SimulatorButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-3 rounded-full border border-[#d97757]/40 bg-[#d97757]/10 px-5 py-3 text-sm font-medium text-[#d97757] transition hover:border-[#d97757] hover:bg-[#d97757]/20"
      >
        <Calculator className="h-4 w-4" strokeWidth={1.5} />
        Simulador de infra e custos
      </button>
      <InfraSimulatorModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
