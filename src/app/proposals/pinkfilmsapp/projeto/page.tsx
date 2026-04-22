import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Lightbulb,
  Palette,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
  GitBranch,
  Database,
  Monitor,
  Smartphone,
  Server,
  MessageCircle,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProposalNav } from "@/components/proposals/proposal-nav";
import { ProposalGate } from "@/components/proposals/proposal-gate";
import { Reveal } from "@/components/proposals/reveal";
import { SimulatorButton } from "@/components/proposals/simulator-button";

export const metadata: Metadata = {
  title: "Projeto Tecnico — PinkFilmsApp",
  description:
    "Detalhamento tecnico do projeto PinkFilmsApp: da ideia ao lancamento.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

/* ─── Helpers ─── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-10 flex items-center gap-4">
    <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-pink-500">
      {children}
    </span>
    <div className="h-px flex-1 bg-gradient-to-r from-pink-500/40 via-border to-transparent" />
  </div>
);

const Section = ({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="py-24 sm:py-32">
    <Container>
      <Reveal>{children}</Reveal>
    </Container>
  </section>
);

const Feature = ({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon?: LucideIcon;
}) => (
  <div className="border-t border-border pt-6">
    {Icon ? (
      <Icon
        className="mb-5 h-5 w-5 text-pink-500"
        strokeWidth={1.5}
        aria-hidden
      />
    ) : null}
    <h3 className="text-lg font-medium tracking-tight">{title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
  </div>
);

const Phase = ({
  number,
  title,
  weeks,
  icon: Icon,
  items,
  highlight,
}: {
  number: string;
  title: string;
  weeks: string;
  icon: LucideIcon;
  items: string[];
  highlight?: boolean;
}) => (
  <div
    className={`border p-8 ${
      highlight
        ? "border-2 border-pink-500 bg-muted/30"
        : "border-border"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
          highlight
            ? "bg-pink-500/15 text-pink-500"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Fase {number}
        </div>
        <h3 className="mt-1 text-xl font-light tracking-tight">{title}</h3>
        <div className="mt-1 text-xs text-pink-500">{weeks}</div>
      </div>
    </div>
    <ul className="mt-6 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm text-foreground/90"
        >
          <span className="mt-2 block h-px w-4 flex-shrink-0 bg-pink-500/50" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const TechCard = ({
  label,
  items,
}: {
  label: string;
  items: { name: string; desc: string; icon: LucideIcon }[];
}) => (
  <div>
    <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </h3>
    <div className="space-y-4">
      {items.map(({ name, desc, icon: Icon }) => (
        <div key={name} className="flex gap-4 border-t border-border pt-4">
          <Icon
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink-500"
            strokeWidth={1.5}
            aria-hidden
          />
          <div>
            <div className="text-sm font-medium">{name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Page ─── */

export default function ProjetoPage() {
  return (
    <ProposalGate
      user="pink"
      pass="pink+agility"
      storageKey="proposal-auth-pinkfilmsapp"
      title="PinkFilmsApp — Projeto"
    >
      <ProposalNav
        label="Projeto Tecnico"
        items={[
          { label: "Ideia", href: "#ideia" },
          { label: "Design", href: "#design" },
          { label: "Prototipo", href: "#prototipo" },
          { label: "Codigo", href: "#codigo" },
          { label: "QA", href: "#qa" },
          { label: "Lancamento", href: "#lancamento" },
        ]}
        cta={{ label: "Ver proposta", href: "/proposals/pinkfilmsapp" }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32">
        <Container>
          <Link
            href="/proposals/pinkfilmsapp"
            className="mb-10 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Voltar para a proposta
          </Link>
          <div className="mb-10 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Projeto tecnico · PinkFilmsApp
          </div>
          <h1 className="max-w-4xl text-5xl font-extralight leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Da{" "}
            <span className="italic font-light text-pink-500">ideia</span> ao{" "}
            <span className="italic font-light text-pink-500">lancamento</span>.
          </h1>
          <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
            Como transformamos o PinkFilmsApp de conceito em produto — cada
            fase do desenvolvimento, as ferramentas que usamos e como garantimos
            qualidade em cada entrega.
          </p>

          <div className="mt-10">
            <SimulatorButton />
          </div>

          {/* Phase timeline overview */}
          <div className="mt-20 grid gap-px overflow-hidden bg-border sm:grid-cols-6">
            {[
              ["01", "Ideia", "S1-S2"],
              ["02", "Design", "S2-S4"],
              ["03", "Prototipo", "S3-S4"],
              ["04", "Codigo", "S5-S14"],
              ["05", "QA", "S13-S16"],
              ["06", "Lancamento", "S16"],
            ].map(([num, label, weeks]) => (
              <div key={num} className="bg-background p-5">
                <div className="text-2xl font-light tabular-nums tracking-tight text-pink-500">
                  {num}
                </div>
                <div className="mt-2 text-sm font-medium">{label}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {weeks}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* IDEIA */}
      <Section id="ideia">
        <Eyebrow>01 — Ideia</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Entender o problema{" "}
          <span className="italic font-light">antes</span> de escrever uma
          linha de codigo.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          As duas primeiras semanas sao dedicadas a discovery: quem e o usuario,
          qual e a dor real, e o que o produto precisa resolver no dia 1.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Lightbulb}
            title="Discovery & Personas"
            desc="Entrevistas com fotografos reais. Definicao de 3 personas (solo, estudio pequeno, iniciante). Mapa de jornada do usuario."
          />
          <Feature
            title="User Stories"
            desc="Historias de usuario priorizadas por impacto. Criterios de aceitacao para cada feature. Backlog estruturado no Linear."
          />
          <Feature
            title="Scope Definition"
            desc="MVP scope lock: contratos, projetos, parcelas, calendario, CRM. Tudo o que NAO entra no MVP e documentado como V2."
          />
        </div>

        <div className="mt-16 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Entregaveis
          </div>
          <div className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {[
              "Documento de personas (3 perfis detalhados)",
              "Mapa de jornada por persona",
              "Backlog priorizado (Linear)",
              "User stories com criterios de aceitacao",
              "Scope lock document (MVP vs V2)",
              "Kickoff deck apresentado ao cliente",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-border py-3 text-sm text-foreground/90"
              >
                <span className="h-px w-4 bg-pink-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DESIGN */}
      <Section id="design">
        <Eyebrow>02 — Design</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Design <span className="italic font-light">system-first</span>.
          Cada pixel com proposito.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Antes de prototipar telas, construimos o sistema visual: cores,
          tipografia, componentes, espacamento. Isso garante consistencia em
          todo o produto.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Palette}
            title="Design System"
            desc="Tokens de cor (dark theme nativo), tipografia (Inter/Poppins), grid 8px, componentes base (botoes, inputs, cards, modais)."
          />
          <Feature
            title="Wireframes"
            desc="Wireframes low-fi para cada tela core. Fluxos de navegacao. Validacao rapida com o cliente antes de investir em high-fi."
          />
          <Feature
            title="UI Kit (Figma)"
            desc="Biblioteca de componentes reutilizaveis no Figma com variantes, auto-layout e Figma Variables. Pronto para handoff."
          />
        </div>

        <div className="mt-16 border-l-2 border-pink-500 bg-muted/30 p-8">
          <p className="text-lg font-light leading-relaxed text-foreground/90">
            O fotografo trabalha em ambientes escuros (edicao de fotos).
            Por isso o PinkFilmsApp usa <span className="font-medium">dark theme
            como padrao</span> — respeitando o contexto real de uso.
          </p>
        </div>

        <div className="mt-16 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Entregaveis
          </div>
          <div className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {[
              "Design System completo (Figma library)",
              "Wireframes de todos os fluxos core",
              "UI Kit com componentes e variantes",
              "Figma Variables (design tokens)",
              "Guia de estilo e tom de marca",
              "Aprovacao do cliente antes do codigo",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-border py-3 text-sm text-foreground/90"
              >
                <span className="h-px w-4 bg-pink-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROTOTIPO */}
      <Section id="prototipo">
        <Eyebrow>03 — Prototipo</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Testar com usuarios{" "}
          <span className="italic font-light">antes</span> de construir.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Prototipos interativos de alta fidelidade no Figma. O cliente e
          usuarios reais testam os fluxos criticos antes de qualquer codigo
          ser escrito.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Layers}
            title="Prototipo interativo"
            desc="Telas high-fi com micro-interacoes. Navegacao real entre telas. Simula a experiencia final do produto."
          />
          <Feature
            title="Teste com usuarios"
            desc="5-8 fotografos testam o prototipo. Tarefas cronometradas. Pontos de friccao identificados e corrigidos antes do codigo."
          />
          <Feature
            title="Iteracao rapida"
            desc="Ajustes em horas, nao semanas. Cada rodada de feedback gera uma nova versao do prototipo. Zero retrabalho no codigo."
          />
        </div>

        <div className="mt-16 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Fluxos prototipados
          </div>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-4">
            {[
              ["01", "Onboarding", "Cadastro em 2 minutos com dados minimos"],
              ["02", "Novo contrato", "Wizard guiado: cliente, servicos, parcelas, clausulas"],
              ["03", "Galeria", "Upload, preview, aprovacao do cliente via link"],
              ["04", "Dashboard", "Visao financeira: receita, custos, lucro real"],
            ].map(([step, title, desc]) => (
              <div key={step} className="bg-background p-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-pink-500">
                  {step}
                </div>
                <div className="mt-3 text-sm font-medium tracking-tight">
                  {title}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CODIGO */}
      <Section id="codigo">
        <Eyebrow>04 — Codigo</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Arquitetura que{" "}
          <span className="italic font-light">escala</span>. Codigo que{" "}
          <span className="italic font-light">dura</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          10 semanas de desenvolvimento intenso em sprints quinzenais. Cada
          merge vai para staging. Cada sprint termina com demo ao cliente.
        </p>

        {/* Tech Stack */}
        <div className="mt-20 grid gap-16 md:grid-cols-2">
          <TechCard
            label="Frontend"
            items={[
              {
                name: "Next.js 15 (App Router)",
                desc: "SSR, SSG, Server Actions, edge middleware",
                icon: Monitor,
              },
              {
                name: "TypeScript + Tailwind CSS v4",
                desc: "Type-safety, utility-first, dark theme nativo",
                icon: Code2,
              },
              {
                name: "shadcn/ui + Radix",
                desc: "Componentes acessiveis, headless, customizaveis",
                icon: Layers,
              },
            ]}
          />
          <TechCard
            label="Backend & Infra"
            items={[
              {
                name: "Drizzle ORM + PostgreSQL (Neon)",
                desc: "Type-safe SQL, migrations, serverless DB",
                icon: Database,
              },
              {
                name: "Vercel + Cloudflare R2",
                desc: "Deploy continuo, CDN global, storage sem egress",
                icon: Server,
              },
              {
                name: "n8n + WhatsApp Business API",
                desc: "Automacao de cobranca, lembretes, notificacoes",
                icon: MessageCircle,
              },
            ]}
          />
        </div>

        {/* Simulator CTA */}
        <div className="mt-12">
          <SimulatorButton />
          <p className="mt-3 text-xs text-muted-foreground">
            Simulacao interativa de custos reais de infraestrutura, storage, backup e app stack em diferentes escalas.
          </p>
        </div>

        {/* Architecture */}
        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Arquitetura
          </div>
          <h3 className="mt-4 max-w-3xl text-2xl font-light leading-snug tracking-tight sm:text-3xl">
            Multi-tenant. Serverless. Um contrato e tudo se conecta.
          </h3>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-3">
            {[
              [
                "Multi-tenant",
                "Cada fotografo/estudio tem seu espaco isolado. Dados nunca se misturam. Roles: admin, editor, viewer.",
              ],
              [
                "Cascading automation",
                "Contrato assinado gera automaticamente: projeto, parcelas, eventos no calendario, tarefas para a equipe.",
              ],
              [
                "Serverless-first",
                "Zero servidores para gerenciar. Vercel escala automatico. Database serverless com connection pooling.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="bg-background p-6">
                <div className="text-sm font-medium tracking-tight">
                  {title}
                </div>
                <div className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sprint breakdown */}
        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Sprints
          </div>
          <h3 className="mt-4 max-w-3xl text-2xl font-light leading-snug tracking-tight sm:text-3xl">
            5 sprints. 10 semanas. MVP no sprint 2, lancamento no sprint 5.
          </h3>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Phase
              number="01"
              title="Foundation"
              weeks="Semanas 5-6"
              icon={Database}
              items={[
                "Setup repo, CI/CD, auth (Clerk)",
                "DB schema + migrations (Drizzle)",
                "CRUD contratos + items + parcelas",
                "Tela de contratos (wizard)",
              ]}
            />
            <Phase
              number="02"
              title="MVP Core"
              weeks="Semanas 7-8"
              icon={Code2}
              highlight
              items={[
                "Automacao: contrato gera projeto + parcelas",
                "Dashboard financeiro basico",
                "Calendario unificado",
                "CRM de clientes",
                "MVP DEPLOY",
              ]}
            />
            <Phase
              number="03"
              title="Features"
              weeks="Semanas 9-10"
              icon={Layers}
              items={[
                "Galeria + preview + aprovacao",
                "Upload fotos (R2 + thumbnails)",
                "WhatsApp reminders (n8n)",
                "Tarefas por projeto com assignee",
              ]}
            />
            <Phase
              number="04"
              title="Financeiro"
              weeks="Semanas 11-12"
              icon={CreditCard}
              items={[
                "Custos fixos + despesas variaveis",
                "Lucro real por projeto",
                "Importacao de contratos",
                "Landing page + pricing tiers",
              ]}
            />
            <Phase
              number="05"
              title="Lancamento"
              weeks="Semanas 13-16"
              icon={Rocket}
              highlight
              items={[
                "GTM + GA4 + Google Ads",
                "SEO tecnico + structured data",
                "Beta fechado (20-50 fotografos)",
                "Bug fixes + polish",
                "LANCAMENTO PUBLICO",
              ]}
            />
          </div>
        </div>

        {/* Dev workflow */}
        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Workflow de desenvolvimento
          </div>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-5">
            {[
              ["01", "Branch", "Feature branch a partir de main"],
              ["02", "Code", "TypeScript, lint, type-check"],
              ["03", "PR", "Code review, preview deploy automatico"],
              ["04", "Test", "CI roda testes, lint, build"],
              ["05", "Ship", "Merge to main, deploy automatico"],
            ].map(([step, title, desc]) => (
              <div key={step} className="bg-background p-5">
                <div className="text-[11px] font-medium text-pink-500">
                  {step}
                </div>
                <div className="mt-2 text-sm font-medium">{title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* QA */}
      <Section id="qa">
        <Eyebrow>05 — Testes & QA</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Cada deploy e{" "}
          <span className="italic font-light">seguro</span>. Cada feature e{" "}
          <span className="italic font-light">testada</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Nao lancamos nada que nao tenha sido testado automaticamente e
          validado manualmente. Zero roleta russa.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={ShieldCheck}
            title="Testes automatizados"
            desc="Vitest (unit tests) + Playwright (E2E). CI bloqueia merge se algum teste falha. Coverage minimo exigido para logica de negocio."
          />
          <Feature
            icon={GitBranch}
            title="Preview deploys"
            desc="Cada PR gera um deploy isolado na Vercel. Testavel pelo PM e designer antes do merge. Nada vai para producao sem aprovacao."
          />
          <Feature
            icon={Monitor}
            title="Monitoramento continuo"
            desc="Sentry captura erros em real-time. PostHog rastreia funnels e uso. BetterStack monitora uptime. Alertas automaticos no Slack."
          />
        </div>

        <div className="mt-16 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Estrategia de testes
          </div>
          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Camada", "Ferramenta", "O que testa", "Quando roda"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Unit",
                    "Vitest",
                    "Logica de negocio, utils, calculo de lucro",
                    "Cada PR (CI)",
                  ],
                  [
                    "Integration",
                    "Vitest + Drizzle",
                    "API routes, server actions, DB queries",
                    "Cada PR (CI)",
                  ],
                  [
                    "E2E",
                    "Playwright",
                    "Fluxos criticos: criar contrato, pagar parcela, aprovar galeria",
                    "Antes de release",
                  ],
                  [
                    "Visual",
                    "Storybook",
                    "Componentes isolados, variantes, responsividade",
                    "Desenvolvimento",
                  ],
                  [
                    "Performance",
                    "Lighthouse CI",
                    "Core Web Vitals, bundle size, acessibilidade",
                    "Cada deploy",
                  ],
                  [
                    "Security",
                    "npm audit + headers",
                    "Dependencias, CSP, CSRF, OWASP Top 10",
                    "Semanal + cada PR",
                  ],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-4 py-3 ${
                          i === 0
                            ? "font-medium text-foreground/90"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Definition of Done
          </div>
          <p className="mt-4 mb-6 text-sm text-muted-foreground">
            Cada feature so e considerada pronta quando:
          </p>
          <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {[
              "Code review aprovado",
              "Testes unitarios para logica de negocio",
              "E2E para fluxo critico",
              "Responsivo (mobile + desktop)",
              "Acessivel (labels, keyboard, contraste)",
              "Type-check + lint passing",
              "Preview deploy funcional",
              "Validado pelo designer",
              "Aprovado pelo PM",
              "Sem erros no console",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-border py-3 text-sm text-foreground/90"
              >
                <span className="h-px w-4 bg-pink-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* LANCAMENTO */}
      <Section id="lancamento">
        <Eyebrow>06 — Lancamento</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Nao e so <span className="italic font-light">deploy</span>. E um{" "}
          <span className="italic font-light">lancamento orquestrado</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Deploy e apertar um botao. Lancamento e garantir que o produto
          chega nas maos certas, com a mensagem certa, no momento certo.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Rocket}
            title="Beta fechado"
            desc="20-50 fotografos convidados. 4 semanas de uso real. Feedback direto via WhatsApp. Bug fixes diarios."
          />
          <Feature
            icon={Smartphone}
            title="Landing page"
            desc="Pagina publica otimizada para conversao. SEO tecnico, structured data, meta tags, Open Graph."
          />
          <Feature
            title="GTM + Analytics"
            desc="Google Tag Manager, GA4, Google Ads configurados. Tracking de eventos: signup, contract_created, payment_received."
          />
        </div>

        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Timeline de lancamento
          </div>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-4">
            {[
              [
                "Semana -4",
                "Pre-launch",
                "Landing page no ar, waitlist aberta, teaser posts no Instagram",
              ],
              [
                "Semana -3 a -1",
                "Beta fechado",
                "Convites para fotografos, feedback loops, ajustes de UX e bugs",
              ],
              [
                "Dia 0",
                "Lancamento",
                "Planos ativos (Free/Pro/Studio), email para waitlist, posts nos grupos",
              ],
              [
                "Semana +1 a +4",
                "Growth",
                "Conteudo Instagram (5x/semana), referral program, parcerias com educadores",
              ],
            ].map(([when, title, desc]) => (
              <div key={when} className="bg-background p-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-pink-500">
                  {when}
                </div>
                <div className="mt-3 text-sm font-medium tracking-tight">
                  {title}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Metricas de sucesso (primeiros 60 dias)
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 md:grid-cols-6">
            {[
              ["50", "Cadastros"],
              ["20", "Ativos"],
              ["5", "Pro"],
              ["40+", "NPS"],
              [">80%", "Cobranca on-time"],
              [">60%", "Retencao M2"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-border pt-6">
                <div className="text-3xl font-light tabular-nums tracking-tight">
                  {value}
                </div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* POS-LANCAMENTO */}
      <Section>
        <Eyebrow>Pos-lancamento</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          6 meses de{" "}
          <span className="italic font-light">monitoramento</span> e{" "}
          <span className="italic font-light">evolucao</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          50h/mes pre-combinadas em planning meetings quinzenais. Foco em
          estabilidade, performance e melhorias baseadas em dados reais.
        </p>

        <div className="mt-16 overflow-x-auto border border-border">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Mes", "Foco", "Horas"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["5", "Monitoramento ativo, hot-fixes, metricas de retencao", "50h"],
                ["6", "Melhorias UX baseadas em feedback, A/B tests", "50h"],
                ["7", "Performance (Core Web Vitals), otimizacao de queries", "50h"],
                ["8", "Features de retencao (plano anual, referral)", "50h"],
                ["9", "Relatorios avancados, export PDF", "50h"],
                ["10", "Refinamentos finais, documentacao, preparacao handover", "50h"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground/90">
                    Mes {row[0]}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row[1]}</td>
                  <td className="px-4 py-3 tabular-nums text-pink-500">
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Handover (mes 11-12)
          </div>
          <div className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {[
              "Documentacao tecnica (README, ADRs, runbooks)",
              "Manual do usuario + videos de treinamento",
              "Transfer de repos, secrets, dominio, contas",
              "3 sessoes de 2h com time tecnico do cliente",
              "2 semanas de suporte pos-handover via Slack",
              "Codigo 100% do cliente — zero lock-in",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-border py-3 text-sm text-foreground/90"
              >
                <span className="h-px w-4 bg-pink-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="border-t border-foreground pt-20">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Proximo passo
          </div>
          <h2 className="mt-6 max-w-3xl text-5xl font-extralight leading-[1.05] tracking-tight sm:text-6xl">
            Pronto para{" "}
            <span className="italic font-light text-pink-500">comecar</span>?
          </h2>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
            Volte para a proposta comercial ou entre em contato direto.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/proposals/pinkfilmsapp"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              Ver proposta comercial
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="mailto:contato@agilitycreative.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Falar com a Agility
            </Link>
          </div>

          <div className="mt-24 border-t border-border pt-8 text-xs text-muted-foreground">
            Proposta confidencial · Validade 30 dias · Cliente Pink Films ·
            Produto PinkFilmsApp
          </div>
        </div>
      </Section>
    </ProposalGate>
  );
}
