"use client";

type NavItem = { id: string; label: string };

export function DepartmentStickyNav({ items }: { items: NavItem[] }) {
  return (
    <section>
      <div className="container" id="deptmenu">
        <div className="navbar" id="navbr">
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
