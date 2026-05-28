"use client";

import Link from "next/link";
import { useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const pages = useMemo(() => {
    if (totalPages <= 1) return [];
    const items: (number | "ellipsis")[] = [];
    const add = (n: number) => {
      if (n >= 1 && n <= totalPages && !items.includes(n)) items.push(n);
    };
    add(1);
    if (currentPage > 3) items.push("ellipsis");
    for (let p = currentPage - 1; p <= currentPage + 1; p++) add(p);
    if (currentPage < totalPages - 2) items.push("ellipsis");
    if (totalPages > 1) add(totalPages);
    return items.filter((v, i, arr) => v !== "ellipsis" || arr[i - 1] !== "ellipsis");
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const href = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  return (
    <nav aria-label="Pagination" className="mt-4">
      <ul className="pagination justify-content-center align-items-center flex-nowrap">
        <li className={`page-item${currentPage <= 1 ? " disabled" : ""}`}>
          {currentPage > 1 ? (
            <Link className="page-link" href={href(currentPage - 1)} aria-label="Previous page">
              «
            </Link>
          ) : (
            <span className="page-link">«</span>
          )}
        </li>
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <li key={`e-${idx}`} className="page-item page-ellipsis disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li key={p} className={`page-item page-number${p === currentPage ? " active" : ""}`}>
              {p === currentPage ? (
                <span className="page-link">{p}</span>
              ) : (
                <Link className="page-link" href={href(p)}>
                  {p}
                </Link>
              )}
            </li>
          ),
        )}
        <li className={`page-item${currentPage >= totalPages ? " disabled" : ""}`}>
          {currentPage < totalPages ? (
            <Link className="page-link" href={href(currentPage + 1)} aria-label="Next page">
              »
            </Link>
          ) : (
            <span className="page-link">»</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function totalPages(count: number, perPage: number): number {
  return Math.max(1, Math.ceil(count / perPage));
}
