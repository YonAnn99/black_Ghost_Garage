import { serviceGroups } from "@/lib/data";

const groupIcons: Record<string, string> = {
  motocicletas: "M5 17.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm14 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM7 17h6.5M11 8h4l3 4.5M9 8 6 13",
  carros: "M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2A2 2 0 0 1 19.5 8l1.5 5M5 16.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm14 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M3 13h18v3.5a1 1 0 0 1-1 1h-1M4 17.5h-1a1 1 0 0 1-1-1V13",
  estetico: "M4 6h16M4 12h10M4 18h7",
};

export default function Services() {
  return (
    <section id="servicios" className="relative bg-void py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section header */}
        <div className="reveal mb-16 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-data text-[11px] uppercase text-ghost-red">
              ◆ Panel de diagnóstico
            </span>
            <h2 className="text-display mt-3 text-[clamp(2rem,5vw,3.2rem)] leading-none text-bone">
              Nuestros servicios
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-bone-dim">
            Tres líneas de trabajo, un mismo estándar: cada vehículo entra
            como caso de ingeniería, no como turno de taller.
          </p>
        </div>

        {/* Diagnostic HUD grid — signature element */}
        <div className="grid gap-5 md:grid-cols-3">
          {serviceGroups.map((group, idx) => (
            <ServiceCard key={group.id} group={group} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  group,
  index,
}: {
  group: (typeof serviceGroups)[number];
  index: number;
}) {
  const highlighted = group.highlighted;
  const iconPath = groupIcons[group.id];

  return (
    <div
      className={`reveal group relative flex flex-col border p-6 transition-colors duration-300 md:p-7 ${
        highlighted
          ? "border-ghost-red bg-ghost-red md:-translate-y-3"
          : "border-line bg-panel hover:border-bone-faint"
      }`}
      data-reveal-delay={index * 100}
    >
      <div
        className={`text-data mb-6 flex items-center justify-between text-[11px] uppercase ${
          highlighted ? "text-void/70" : "text-bone-faint"
        }`}
      >
        <span>UNIT.0{index + 1}</span>
        <span className="flex items-center gap-1.5">
          <span
            className={`size-1.5 rounded-full ${
              highlighted ? "bg-void animate-pulse-dot" : "bg-ghost-red animate-pulse-dot"
            }`}
          />
          Activo
        </span>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h3
          className={`text-display text-2xl leading-none ${
            highlighted ? "text-void" : "text-bone"
          }`}
        >
          {group.title}
        </h3>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-7 shrink-0 ${highlighted ? "text-void" : "text-ghost-red"}`}
          aria-hidden="true"
        >
          <path d={iconPath} />
        </svg>
      </div>

      <div className="flex flex-1 flex-col gap-5">
        {group.categories.map((cat) => (
          <div key={cat.heading}>
            <p
              className={`text-data mb-2.5 text-[11px] uppercase ${
                highlighted ? "text-void/60" : "text-bone-faint"
              }`}
            >
              {cat.heading}
            </p>
            <ul className="flex flex-col gap-2">
              {cat.items.map((item) => (
                <li
                  key={item.label}
                  className={`flex items-start gap-2.5 text-[14px] leading-snug ${
                    highlighted ? "text-void font-medium" : "text-bone-dim"
                  }`}
                >
                  <span
                    className={`mt-2 size-1 shrink-0 rounded-full ${
                      highlighted ? "bg-void" : "bg-ghost-red"
                    }`}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className={`mt-7 h-[3px] w-full overflow-hidden ${
          highlighted ? "bg-void/20" : "bg-line"
        }`}
      >
        <div
          className={`h-full w-1/3 transition-[width] duration-500 ease-out group-hover:w-full ${
            highlighted ? "bg-void" : "bg-ghost-red"
          }`}
        />
      </div>
    </div>
  );
}
