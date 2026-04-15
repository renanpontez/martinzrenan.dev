import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Minus,
  FileText,
  MessageCircle,
  TrendingUp,
  ImageIcon,
  Users,
  Calendar,
  Code2,
  Palette,
  ClipboardList,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ProposalNav } from "@/components/proposals/proposal-nav";
import { ProposalGate } from "@/components/proposals/proposal-gate";
import { Reveal } from "@/components/proposals/reveal";

export const metadata: Metadata = {
  title: "Proposta — PinkFilmsApp",
  description:
    "Proposta exclusiva para a Pink Films: construir, lançar e escalar o PinkFilmsApp.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

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

const Stat = ({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) => (
  <div className="border-t border-border pt-8">
    <div className="font-light text-5xl tracking-tight tabular-nums sm:text-6xl">
      {value}
    </div>
    <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </div>
    {note ? (
      <p className="mt-2 text-sm text-muted-foreground/80">{note}</p>
    ) : null}
  </div>
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

const Row = ({
  label,
  values,
  highlight,
}: {
  label: string;
  values: (string | boolean)[];
  highlight?: boolean;
}) => (
  <tr
    className={
      highlight
        ? "border-t border-border bg-muted/40"
        : "border-t border-border"
    }
  >
    <td className="px-4 py-4 text-sm text-foreground/90">{label}</td>
    {values.map((v, i) => (
      <td key={i} className="px-4 py-4 text-center text-sm text-muted-foreground">
        {typeof v === "boolean" ? (
          v ? (
            <Check className="mx-auto h-4 w-4 text-pink-500" strokeWidth={1.75} />
          ) : (
            <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" strokeWidth={1.5} />
          )
        ) : (
          v
        )}
      </td>
    ))}
  </tr>
);

export default function PinkFilmsAppProposal() {
  return (
    <ProposalGate
      user="pink"
      pass="pink+agility"
      storageKey="proposal-auth-pinkfilmsapp"
      title="PinkFilmsApp"
    >
      <ProposalNav
        label="PinkFilmsApp"
        items={[
          { label: "Problema", href: "#problema" },
          { label: "Mercado", href: "#oportunidade" },
          { label: "Solução", href: "#solucao" },
          { label: "Investimento", href: "#investimento" },
          { label: "Financeiro", href: "#financeiro" },
          { label: "Riscos", href: "#riscos" },
        ]}
        cta={{ label: "Agendar", href: "mailto:contato@agilitycreative.com" }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-32">
        <Container>
          <div className="mb-10 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Proposta confidencial · Para Pink Films
          </div>
          <h1 className="max-w-4xl text-5xl font-extralight leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Transforme a{" "}
            <span className="italic font-light text-pink-500">Pink Films</span>{" "}
            numa SaaS que fotógrafos{" "}
            <span className="italic font-light text-pink-500">amam</span>.
          </h1>
          <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
            Um ano de parceria dedicada para construir, lançar e escalar o{" "}
            <span className="text-foreground">PinkFilmsApp</span> — a
            plataforma que vai definir o mercado de gestão para fotógrafos no
            Brasil.
          </p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 rounded-full">
              <Link href="#investimento">
                Ver investimento
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-full"
            >
              <Link href="#oportunidade">A oportunidade</Link>
            </Button>
          </div>

          <div className="mt-20 grid gap-10 sm:grid-cols-3">
            <Stat value="170k" label="Fotógrafos no Brasil" />
            <Stat value="R$ 204M" label="Mercado total / ano" />
            <Stat value="~950k" label="Casamentos / ano" />
          </div>
        </Container>
      </section>

      {/* PROBLEMA */}
      <Section id="problema">
        <Eyebrow>O problema</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Fotógrafos brasileiros estão{" "}
          <span className="italic font-light">perdendo dinheiro</span> — todos
          os dias.
        </h2>
        <div className="mt-16 grid gap-16 md:grid-cols-2">
          <div className="space-y-6 text-lg font-light leading-relaxed text-muted-foreground">
            <p>
              A maioria usa{" "}
              <span className="text-foreground">
                planilha, WhatsApp e Google Drive
              </span>{" "}
              para gerenciar eventos de R$ 5.000, R$ 10.000, R$ 20.000.
            </p>
            <p>
              Esquecem de cobrar parcelas. Não sabem o lucro real. Entregam no
              Drive e esperam o cliente aprovar <em>“no olho”</em>.
            </p>
            <p className="text-foreground">
              É um mercado enorme, sem uma solução decente.
            </p>
          </div>
          <div className="grid gap-0">
            <Stat
              value="5–15%"
              label="Receita perdida"
              note="em parcelas esquecidas por ano"
            />
            <div className="h-8" />
            <Stat
              value="0"
              label="Visibilidade de lucro"
              note="não sabem se o evento deu margem"
            />
            <div className="h-8" />
            <Stat
              value="10h"
              label="Por semana em tarefa manual"
              note="tempo que poderia gerar mais receita"
            />
          </div>
        </div>
      </Section>

      {/* OPORTUNIDADE */}
      <Section id="oportunidade">
        <Eyebrow>A oportunidade</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Um mercado <span className="italic font-light">gigante</span>.
          Nenhum <span className="italic font-light">player forte</span>.
        </h2>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          <div className="border-t border-border pt-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              TAM
            </div>
            <div className="mt-4 text-4xl font-light tracking-tight">
              R$ 204M
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Todos os fotógrafos profissionais no Brasil.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              SAM
            </div>
            <div className="mt-4 text-4xl font-light tracking-tight">
              R$ 78M
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Fotógrafos de casamento e evento digitais.
            </p>
          </div>
          <div className="border-t-2 border-pink-500 pt-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-pink-500">
              SOM
            </div>
            <div className="mt-4 text-4xl font-light tracking-tight">
              R$ 1,6–3,9M
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Captura realista em 3–5 anos.
            </p>
          </div>
        </div>
      </Section>

      {/* COMPETIÇÃO */}
      <Section id="competicao">
        <Eyebrow>Análise competitiva</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Ninguém combina{" "}
          <span className="italic font-light">
            tudo que o fotógrafo brasileiro precisa
          </span>
          .
        </h2>

        <h3 className="mt-20 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Concorrentes internacionais
        </h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Feature
                </th>
                {["Studio Ninja", "HoneyBook", "17hats", "Dubsado"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row
                label="Preço em R$ (convertido)"
                values={["R$143–286", "R$97–403", "R$77–306", "R$102–204"]}
              />
              <Row label="Português" values={[false, false, false, false]} />
              <Row label="Galeria / Preview" values={[false, false, false, false]} />
              <Row label="WhatsApp" values={[false, false, false, false]} />
              <Row label="PIX / Boleto" values={[false, false, false, false]} />
              <Row label="NF-e" values={[false, false, false, false]} />
            </tbody>
          </table>
        </div>

        <h3 className="mt-16 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Concorrentes brasileiros
        </h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Feature
                </th>
                {["Estúdio Boss", "Foto.app", "Bling / Tiny"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row
                label="CRM específico para fotógrafo"
                values={[true, false, "Genérico"]}
              />
              <Row label="Contratos" values={[true, false, false]} />
              <Row
                label="Galeria de aprovação"
                values={["Básico", true, false]}
              />
              <Row
                label="WhatsApp automático"
                values={[false, false, false]}
              />
              <Row
                label="Lucro real por projeto"
                values={[false, false, false]}
              />
              <Row
                label="Tarefas com responsável"
                values={[false, false, false]}
              />
            </tbody>
          </table>
        </div>

        <div className="mt-16 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            O gap que ninguém preenche
          </div>
          <h3 className="mt-4 max-w-3xl text-2xl font-light leading-snug tracking-tight sm:text-3xl">
            Nenhuma solução combina o que o fotógrafo brasileiro precisa.
          </h3>
          <div className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {[
              "Cobrança via WhatsApp",
              "Pagamento em PIX",
              "Lucro real por projeto",
              "Galeria com aprovação do cliente",
              "Contrato completo em português",
              "Gestão de equipe por projeto",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-t border-border py-4 text-sm text-foreground/90"
              >
                <span className="h-px w-6 bg-foreground" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SOLUÇÃO */}
      <Section id="solucao">
        <Eyebrow>A solução</Eyebrow>
        <h2 className="text-5xl font-extralight leading-[1.05] tracking-tight sm:text-6xl">
          PinkFilmsApp.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          A central de operações que fotógrafos esperavam. Simples de usar.
          Impossível de abandonar.
        </p>

        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={FileText}
            title="Contratos em minutos"
            desc="Wizard preenche dados do cliente e gera contrato profissional com parcelas automáticas."
          />
          <Feature
            icon={MessageCircle}
            title="Cobrança sem constrangimento"
            desc="WhatsApp automático no dia do vencimento. Sem você precisar lembrar. Sem cliente esquecer."
          />
          <Feature
            icon={TrendingUp}
            title="Lucro real por evento"
            desc="Custos fixos e variáveis por projeto. Finalmente saiba se o evento deu margem."
          />
          <Feature
            icon={ImageIcon}
            title="Aprovação profissional"
            desc="Galeria online onde o cliente aprova ou pede ajustes. Adeus Google Drive."
          />
          <Feature
            icon={Users}
            title="Equipe alinhada"
            desc="Tarefas por projeto com responsável e prazo. Todo mundo sabe o que fazer."
          />
          <Feature
            icon={Calendar}
            title="Calendário unificado"
            desc="Gravações, prazos de entrega, vencimentos — tudo em um só lugar."
          />
        </div>

        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            A mágica
          </div>
          <h3 className="mt-4 max-w-3xl text-2xl font-light leading-snug tracking-tight sm:text-3xl">
            Um contrato — e tudo o resto acontece sozinho.
          </h3>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-4">
            {[
              ["01", "Contrato criado"],
              ["02", "Projeto, parcelas e agenda gerados"],
              ["03", "Shoot e edição"],
              ["04", "Cliente aprova, WhatsApp cobra"],
            ].map(([step, title]) => (
              <div key={step} className="bg-background p-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {step}
                </div>
                <div className="mt-4 text-sm font-medium tracking-tight">
                  {title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DESENVOLVIMENTO */}
      <Section id="desenvolvimento">
        <Eyebrow>Desenvolvimento</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Como <span className="italic font-light">construímos</span>.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Metodologia ágil. Time dedicado. Entregas previsíveis.
        </p>

        <h3 className="mt-20 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Metodologia
        </h3>
        <div className="grid gap-10 md:grid-cols-3">
          <Feature
            title="Design-first"
            desc="Cada feature começa por protótipo no Figma, aprovado antes de ir para código. Zero retrabalho."
          />
          <Feature
            title="Sprints quinzenais"
            desc="Entregas a cada duas semanas com demo ao cliente. Feedback contínuo, curso corrigível."
          />
          <Feature
            title="Deploy contínuo"
            desc="Cada merge vai para staging. Você acompanha o build em tempo real."
          />
        </div>

        <h3 className="mt-20 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Time alocado
        </h3>
        <div className="grid gap-10 md:grid-cols-3">
          <Feature
            icon={Code2}
            title="Engenheiro Full-stack Sênior"
            desc="Arquitetura, frontend, backend, banco de dados, deploy e observabilidade."
          />
          <Feature
            icon={Palette}
            title="Product Designer"
            desc="UX research, wireframes, design system, protótipos de alta fidelidade."
          />
          <Feature
            icon={ClipboardList}
            title="Product Manager"
            desc="Roadmap, priorização, comunicação com cliente, gestão de escopo."
          />
        </div>
      </Section>

      {/* INVESTIMENTO */}
      <Section id="investimento">
        <Eyebrow>Investimento</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Três <span className="italic font-light">caminhos</span>. Um
          objetivo.
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Escolha como quer construir o PinkFilmsApp. Conversamos sem
          compromisso.
        </p>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {/* Essencial */}
          <div className="relative flex flex-col border border-border p-8">
            <div className="absolute -top-3 left-8 border border-pink-500 bg-background px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-pink-500">
              Mais barato e rápido
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Plano 01
            </div>
            <h3 className="mt-4 text-2xl font-light tracking-tight">
              Essencial
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Valide o core antes de investir mais.
            </p>

            <div className="my-8 border-t border-border pt-8">
              <div className="text-4xl font-light tracking-tight">R$ 25k</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Investimento único · parcelável
              </div>
            </div>

            <ul className="flex-1 space-y-3 text-sm text-foreground/90">
              {[
                "MVP completo funcionando",
                "Contratos, projetos, financeiro, calendário",
                "WhatsApp reminders automáticos",
                "Preview/Aprovação + Lucro real por projeto",
                "Design profissional (Figma)",
                "6–8 semanas de entrega",
                "Deploy em produção",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink-500"
                    strokeWidth={1.75}
                  />
                  {i}
                </li>
              ))}
            </ul>

            <div className="mt-10 text-xs text-muted-foreground">
              Ideal para validar a ideia antes de escalar.
            </div>
          </div>

          {/* Profissional */}
          <div className="relative flex flex-col border-2 border-pink-500 bg-muted/30 p-8">
            <div className="absolute -top-3 left-8 bg-pink-500 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white">
              Mais customização
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Plano 02 · 12 meses
            </div>
            <h3 className="mt-4 text-2xl font-light tracking-tight">
              Profissional
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Projeto anual, do design à evolução pós-launch.
            </p>

            <div className="my-8 border-t border-border pt-8">
              <div className="text-4xl font-light tracking-tight">R$ 60k</div>
              <div className="mt-2 text-sm text-muted-foreground">
                12 meses · R$ 5k / mês
              </div>
            </div>

            <ul className="flex-1 space-y-3 text-sm text-foreground/90">
              {[
                "Produto completo (todas as features)",
                "MVP em 2 meses · lançamento final em 4 meses",
                "6 meses de monitoramento e evolução (40h/mês)",
                "Importação de contratos + gestão de equipe",
                "Design profissional (Figma)",
                "SEO técnico e on-page otimizado",
                "Performance (Core Web Vitals no verde)",
                "Segurança enterprise (LGPD, OWASP, criptografia)",
                "Arquitetura escalável pronta para crescer",
                "Google Tag Manager + Google Analytics 4",
                "Google Ads configurado e integrado",
                "Lançamento supervisionado",
                "V2 baseada em feedback real",
                "Handover completo ao fim",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink-500"
                    strokeWidth={1.75}
                  />
                  {i}
                </li>
              ))}
            </ul>

            <div className="mt-10 text-xs font-medium text-foreground">
              Ideal para quem quer dominar o mercado.
            </div>
          </div>

          {/* Parceria */}
          <div className="relative flex flex-col border border-border p-8">
            <div className="absolute -top-3 left-8 border border-pink-500 bg-background px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-pink-500">
              Parceria
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Plano 03
            </div>
            <h3 className="mt-4 text-2xl font-light tracking-tight">
              Parceria
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Construímos juntos. Ganhamos juntos.
            </p>

            <div className="my-8 border-t border-border pt-8">
              <div className="text-3xl font-light tracking-tight">
                Vamos conversar
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Equity ou revenue share
              </div>
            </div>

            <ul className="flex-1 space-y-3 text-sm text-foreground/90">
              {[
                "WhatsApp + todas as features",
                "Investimento inicial reduzido",
                "Agility como sócia técnica",
                "Co-responsabilidade pelo crescimento",
                "Evolução contínua incluída",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2.5 block h-px w-3 flex-shrink-0 bg-pink-500" />
                  {i}
                </li>
              ))}
            </ul>

            <div className="mt-10 text-xs text-muted-foreground">
              Ideal para quem pensa no longo prazo.
            </div>
          </div>
        </div>
      </Section>

      {/* FINANCEIRO */}
      <Section id="financeiro">
        <Eyebrow>Financeiro</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Os <span className="italic font-light">números</span> por trás da
          decisão.
        </h2>

        <h3 className="mt-20 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Comparativo rápido
        </h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"></th>
                {["Essencial", "Profissional", "Parceria"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row
                label="Investimento"
                values={["R$ 25.000", "R$ 60.000", "Reduzido"]}
              />
              <Row
                label="Formato"
                values={["Único · parcelável", "R$ 5.000 / mês × 12", "Equity / Revenue"]}
              />
              <Row
                label="Duração"
                values={["6–8 semanas", "12 meses", "6–12 meses"]}
              />
              <Row
                label="WhatsApp reminders"
                values={[true, true, true]}
              />
              <Row
                label="Preview / Aprovação"
                values={[true, true, true]}
              />
              <Row
                label="Lucro real por projeto"
                values={[true, true, true]}
              />
              <Row
                label="Monitoramento pós-launch"
                values={["Sob demanda", "6 meses", "Contínuo"]}
              />
              <Row
                label="V2 + evolução"
                values={[false, "3 meses", "Contínuo"]}
              />
              <Row
                label="Handover ao fim"
                values={["Entrega direta", "Completo", "N/A"]}
              />
            </tbody>
          </table>
        </div>

        <h3 className="mt-20 mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Custos operacionais mensais
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Infraestrutura recorrente pós-launch — responsabilidade da Pink
          Films.
        </p>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Serviço
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Propósito
                </th>
                <th className="px-4 py-4 text-right text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Inicial
                </th>
                <th className="px-4 py-4 text-right text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Em escala (500+)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Vercel", "Hosting + APIs", "R$ 0", "R$ 120"],
                ["Banco de dados", "Postgres gerenciado", "R$ 0", "R$ 150"],
                ["Storage", "Fotos, PDFs, comprovantes", "R$ 30", "R$ 250"],
                ["Automação", "WhatsApp + webhooks", "R$ 100", "R$ 250"],
                ["WhatsApp Business API", "Cobrança automática", "R$ 50", "R$ 400"],
                ["Monitoramento", "Erros + analytics", "R$ 0", "R$ 150"],
                ["Domínio + email", "pinkfilmsapp.com.br", "R$ 30", "R$ 50"],
              ].map(([a, b, c, d]) => (
                <tr key={a} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground/90">{a}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b}</td>
                  <td className="px-4 py-3 text-right text-foreground/90 tabular-nums">
                    {c}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground/90 tabular-nums">
                    {d}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-foreground bg-muted/40">
                <td className="px-4 py-4 text-xs font-medium uppercase tracking-[0.15em]">
                  Total / mês
                </td>
                <td className="px-4 py-4"></td>
                <td className="px-4 py-4 text-right font-medium tabular-nums">
                  R$ 210
                </td>
                <td className="px-4 py-4 text-right font-medium tabular-nums">
                  R$ 1.370
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-20 mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Retorno do investimento (Plano Profissional)
        </h3>
        <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
          Projeção do fluxo de caixa ao longo de 18 meses. A coluna{" "}
          <span className="text-foreground">Acumulado</span> considera tudo
          pago à Agility + infra desde o mês 1.
        </p>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "Período",
                  "Pagantes",
                  "MRR",
                  "Custos / mês",
                  "Resultado / mês",
                  "Acumulado",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-3 py-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground ${i === 0 ? "text-left" : "text-right"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Mês 1–2 (MVP)", "—", "—", "R$ 5.000", "−R$ 5.000", "−R$ 10.000"],
                ["Mês 4 (Lançamento final)", "20", "R$ 1.100", "R$ 5.210", "−R$ 4.110", "−R$ 23.220"],
                ["Mês 7 (Monitoramento)", "80", "R$ 4.400", "R$ 5.240", "−R$ 840", "−R$ 35.000"],
                ["Mês 10 (Fim do contrato)", "150", "R$ 8.250", "R$ 5.300", "+R$ 2.950", "−R$ 32.000"],
                ["Mês 13 (Pós-handover)", "280", "R$ 15.400", "R$ 900", "+R$ 14.500", "+R$ 16.000"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  {row.map((c, i) => (
                    <td
                      key={i}
                      className={`px-3 py-3 tabular-nums ${i === 0 ? "text-left text-foreground/90" : "text-right text-muted-foreground"}`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-foreground bg-muted/40">
                {["Mês 16 (Payback)", "450", "R$ 24.750", "R$ 1.000", "+R$ 23.750", "+R$ 60.000"].map(
                  (c, i) => (
                    <td
                      key={i}
                      className={`px-3 py-4 font-medium tabular-nums ${i === 0 ? "text-left" : "text-right"}`}
                    >
                      {c}
                    </td>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            O investimento se paga rápido
          </div>
          <h3 className="mt-4 max-w-3xl text-2xl font-light leading-snug tracking-tight sm:text-3xl">
            Payback em 16 meses. ARR de ~6× em 24.
          </h3>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <Stat value="R$ 60k" label="Investimento total" />
            <Stat value="16 meses" label="Payback estimado" />
            <Stat value="R$ 396k" label="ARR no mês 24 (~6× ROI)" />
          </div>
        </div>
      </Section>

      {/* RISCOS */}
      <Section id="riscos">
        <Eyebrow>Riscos e mitigações</Eyebrow>
        <div className="flex items-start gap-5">
          <AlertTriangle
            className="mt-3 h-7 w-7 flex-shrink-0 text-pink-500 sm:mt-4 sm:h-8 sm:w-8"
            strokeWidth={1.5}
            aria-hidden
          />
          <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
            O que <span className="italic font-light">pode dar errado</span> —
            e como evitamos.
          </h2>
        </div>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Transparência total sobre os riscos reais do projeto e as mitigações
          já previstas no plano.
        </p>

        <div className="mt-16 overflow-x-auto border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Risco", "Probabilidade", "Impacto", "Mitigação"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground ${i === 0 || i === 3 ? "text-left" : "text-center"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Fotógrafo não quer pagar",
                  "Alta",
                  "Alto",
                  "Plano free generoso. Uma parcela esquecida paga o app por um ano.",
                ],
                [
                  "Concorrente gringo traduz",
                  "Baixa",
                  "Alto",
                  "Vantagem de 1st-mover local. WhatsApp + PIX difíceis de replicar.",
                ],
                [
                  "Baixa adoção tech",
                  "Alta",
                  "Alto",
                  "UX extremamente simples. Onboarding em 2 min. Vídeos curtos de treinamento.",
                ],
                [
                  "WhatsApp API complexa",
                  "Média",
                  "Médio",
                  "n8n como middleware. Fallback para email/SMS se necessário.",
                ],
                [
                  "Churn sazonal (low season)",
                  "Média",
                  "Alto",
                  "Features off-season (planejamento anual). Plano anual com desconto.",
                ],
                [
                  "Dados sensíveis / LGPD",
                  "Baixa",
                  "Alto",
                  "Criptografia, backups e compliance LGPD desde o dia 1.",
                ],
                [
                  "Escopo aumenta durante o dev",
                  "Média",
                  "Médio",
                  "PM dedicado controla escopo. Mudanças maiores viram V2 pós-launch.",
                ],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="px-4 py-4 text-foreground/90">{row[0]}</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">
                    {row[1]}
                  </td>
                  <td className="px-4 py-4 text-center text-muted-foreground">
                    {row[2]}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* IA VS AGÊNCIA */}
      <Section id="ia-vs-agencia">
        <Eyebrow>IA vs Agência</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          &ldquo;Mas eu posso fazer isso com{" "}
          <span className="italic font-light">IA</span>, não posso?&rdquo;
        </h2>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          A diferença entre um protótipo que funciona na demo e um produto que
          não quebra na mão do cliente.
        </p>

        <div className="mt-12 border-l-2 border-pink-500 bg-muted/30 p-8">
          <p className="text-lg font-light leading-relaxed text-foreground/90">
            Ferramentas de IA geram código impressionante em minutos. O
            problema não é gerar o código — é tudo que cerca o código:
            segurança, infraestrutura, escala, versionamento, monitoramento,
            backups, compliance.
          </p>
        </div>

        <h3 className="mt-16 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          O custo real de &ldquo;fazer sozinho com IA&rdquo;
        </h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Cenário", "Custo inicial", "Custo real em 12 meses"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground ${i === 0 ? "text-left" : "text-right"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-4">
                  <div className="text-foreground/90">
                    &ldquo;Eu faço com ChatGPT&rdquo;
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Sem ninguém experiente supervisionando
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-foreground/90 tabular-nums">
                  R$ 0–2.000
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="tabular-nums text-foreground">R$ 80.000+</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Refatoração + dados vazados + churn
                  </div>
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-4">
                  <div className="text-foreground/90">Freelancer júnior + IA</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Sem experiência em escala
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-foreground/90 tabular-nums">
                  R$ 15–30k
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="tabular-nums text-foreground">R$ 50–100k</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Reescrita parcial + bugs + performance
                  </div>
                </td>
              </tr>
              <tr className="border-t border-foreground bg-muted/40">
                <td className="px-4 py-4">
                  <div className="font-medium">Agility Creative (Plano Pro)</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Time sênior + IA como aceleradora
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-medium tabular-nums">
                  R$ 5.000 / mês
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="font-medium tabular-nums">
                    R$ 60.000 + infra
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Previsível. ROI positivo no mês 12–18.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-20 border-t border-foreground pt-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            A analogia que importa
          </div>
          <div className="mt-6 max-w-3xl space-y-5 text-2xl font-extralight leading-snug tracking-tight sm:text-3xl">
            <p>
              Uma IA gerar código é como uma{" "}
              <span className="italic">furadeira automática</span>: ótima
              ferramenta.
            </p>
            <p>
              Mas você não contrata{" "}
              <span className="italic">uma furadeira</span> para construir sua
              casa.
            </p>
            <p className="text-foreground">
              Você contrata um engenheiro, um arquiteto e um mestre de obras —
              que usam a furadeira e outras ferramentas para entregar uma casa
              que não cai.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Nosso time usa IA todos os dias para acelerar 3–5× o
            desenvolvimento. Mas cada decisão de arquitetura, segurança e
            escala passa por uma mente experiente. Você paga pela curadoria,
            não pelo código.
          </p>
        </div>
      </Section>

      {/* O QUE VOCÊ RECEBE */}
      <Section>
        <Eyebrow>O que você recebe</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl">
          Muito mais que <span className="italic font-light">um app</span>.
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Identidade visual"
            desc="Design system e protótipos que seu cliente vai adorar."
          />
          <Feature
            title="Produto completo"
            desc="Funcionando, testado e em produção."
          />
          <Feature
            title="Segurança profissional"
            desc="LGPD, backup, criptografia — tudo pronto."
          />
          <Feature
            title="Monitoramento 24/7"
            desc="Você sabe antes do cliente quando algo quebra."
          />
          <Feature
            title="Lançamento orquestrado"
            desc="Beta fechado, lançamento público, crescimento."
          />
          <Feature
            title="Treinamento + docs"
            desc="Sua equipe capacitada para continuar sozinha."
          />
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section>
        <div className="border-t border-foreground pt-20">
          <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Próximo passo
          </div>
          <h2 className="mt-6 max-w-3xl text-5xl font-extralight leading-[1.05] tracking-tight sm:text-6xl">
            Vamos{" "}
            <span className="italic font-light text-pink-500">conversar</span>?
          </h2>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
            Uma reunião de 60 minutos para entender seus objetivos, alinhar
            expectativas e definir juntos qual caminho faz mais sentido.
          </p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 rounded-full">
              <Link href="mailto:contato@agilitycreative.com">
                Agendar reunião
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-full"
            >
              <Link href="#investimento">Ver propostas</Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>Sem compromisso</span>
            <span>60 minutos</span>
            <span>NDA se necessário</span>
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
