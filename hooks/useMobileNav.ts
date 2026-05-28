"use client";

import { useCallback, useEffect, useState } from "react";

export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("menu-open");
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("menu-open");
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle("menu-open", next);
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, []);

  return { isOpen, open, close, toggle };
}
