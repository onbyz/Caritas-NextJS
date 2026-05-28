import Link from "next/link";

const LINKS = [
  { href: "/radiology", label: "Radiology & Laboratory" },
  { href: "/insurance", label: "Insurance Partners" },
  { href: "/blood-bank", label: "Blood Bank" },
  { href: "/secondopinion", label: "Second Opinion" },
  { href: "/clinical-nutrition", label: "Clinical Nutrition" },
  { href: "/pastoralcare", label: "Pastoral Care" },
  { href: "/organ", label: "Organ Transplant Program" },
  { href: "/caritas-home-care", label: "Caritas Home Care" },
] as const;

export function ServiceQuickLinks({ activeHref }: { activeHref?: string }) {
  return (
    <section>
      <div className="container">
        <div className="row justify-content-center" style={{ width: "90%", margin: "0 auto" }}>
          {LINKS.map((item) => {
            const isActive = activeHref === item.href;
            const color = isActive ? "#c71782" : "#000";
            return (
              <div key={item.href} className="col-lg-6 col-md-6 col-sm-12 px-3">
                <div className="row">
                  <div className="col-8" style={{ margin: "auto 0" }}>
                    <Link href={item.href} style={{ color: `${color} !important` }}>
                      {item.label}
                    </Link>
                  </div>
                  <div className="col-4 text-end">
                    <Link href={item.href} style={{ color: "#C71782" }}>
                      <i className="bi bi-arrow-right" style={{ color: "#C71782", fontSize: 35 }} />
                    </Link>
                  </div>
                </div>
                <hr style={{ width: "98%", margin: 0 }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
