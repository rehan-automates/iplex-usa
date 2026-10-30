"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { getSelectMenuLayout } from "@/lib/select-layout";

import styles from "./ContactForm.module.css";

const options = ["$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+"];

export function BudgetSelect() {
  const id = useId();
  const labelId = `${id}-label`;
  const valueId = `${id}-value`;
  const listId = `${id}-options`;
  const triggerId = `${id}-trigger`;
  const controlRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const searchRef = useRef({ text: "", time: 0 });
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [menu, setMenu] = useState<ReturnType<typeof getSelectMenuLayout> | null>(null);
  const isOpen = menu !== null;

  function measureMenu() {
    const anchor = triggerRef.current!.getBoundingClientRect();
    const viewport = window.visualViewport;
    return getSelectMenuLayout(anchor, {
      top: viewport?.offsetTop ?? 0,
      height: viewport?.height ?? window.innerHeight,
    });
  }

  function openAt(index = Math.max(0, options.indexOf(value))) {
    setActiveIndex(index);
    setMenu(measureMenu());
  }

  function choose(index: number) {
    setValue(options[index]);
    setMenu(null);
  }

  useEffect(() => {
    if (!isOpen) return;

    function reposition() {
      const anchor = triggerRef.current!.getBoundingClientRect();
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop ?? 0;
      const height = viewport?.height ?? window.innerHeight;
      // Close a menu whose field has scrolled out of view.
      if (anchor.bottom <= top || anchor.top >= top + height) {
        setMenu(null);
        return;
      }
      setMenu(getSelectMenuLayout(anchor, { top, height }));
    }

    function dismiss(event: PointerEvent) {
      if (!controlRef.current?.contains(event.target as Node)) setMenu(null);
    }

    const observer = new ResizeObserver(reposition);
    observer.observe(triggerRef.current!);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    window.visualViewport?.addEventListener("resize", reposition);
    window.visualViewport?.addEventListener("scroll", reposition);
    document.addEventListener("pointerdown", dismiss);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
      window.visualViewport?.removeEventListener("resize", reposition);
      window.visualViewport?.removeEventListener("scroll", reposition);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  useEffect(() => {
    const form = controlRef.current?.closest("form");
    function reset() {
      setValue("");
      setActiveIndex(0);
      setMenu(null);
      searchRef.current = { text: "", time: 0 };
    }
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const { key } = event;
    if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      if (isOpen && event.altKey && key === "ArrowUp") choose(activeIndex);
      else if (!isOpen) openAt();
      else if (!event.altKey) setActiveIndex((index) => Math.max(0, Math.min(options.length - 1, index + (key === "ArrowDown" ? 1 : -1))));
    } else if (["Home", "End", "PageUp", "PageDown"].includes(key)) {
      event.preventDefault();
      openAt(key === "Home" || key === "PageUp" ? 0 : options.length - 1);
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      if (isOpen) choose(activeIndex);
      else openAt();
    } else if (key === "Escape" && isOpen) {
      event.preventDefault();
      setMenu(null);
    } else if (key === "Tab" && isOpen) {
      choose(activeIndex);
    } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const character = key.toLowerCase();
      const previous = now - searchRef.current.time < 700 ? searchRef.current.text : "";
      const query = previous === character ? character : previous + character;
      searchRef.current = { text: query, time: now };
      const start = query.length === 1 && isOpen ? activeIndex + 1 : 0;
      const match = options.findIndex((_, offset) => {
        const label = options[(start + offset) % options.length].toLowerCase();
        return label.startsWith(query) || label.replace(/^\$/, "").startsWith(query);
      });
      if (match !== -1) openAt((start + match) % options.length);
    }
  }

  return (
    <div className={styles.field}>
      <label className={styles.budgetLabel} htmlFor={triggerId} id={labelId}>BUDGET</label>
      <div
        className={styles.selectControl}
        data-open={isOpen}
        ref={controlRef}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenu(null);
        }}
      >
        <input type="hidden" name="budget" value={value} />
        <button
          className={styles.selectTrigger}
          data-placeholder={!value}
          id={triggerId}
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-activedescendant={isOpen ? `${listId}-${activeIndex}` : undefined}
          onClick={() => isOpen ? setMenu(null) : openAt()}
          onKeyDown={handleKeyDown}
        >
          <span id={valueId}>{value || "Select budget range"}</span>
          <svg className={styles.selectArrow} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="m4 7 6 6 6-6" />
          </svg>
        </button>
        <ul
          className={styles.selectMenu}
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          hidden={!isOpen}
          data-placement={menu?.placement}
          style={{ maxHeight: menu?.maxHeight }}
        >
          {options.map((option, index) => (
            <li
              className={styles.selectOption}
              id={`${listId}-${index}`}
              key={option}
              role="option"
              aria-selected={index === activeIndex}
              data-active={index === activeIndex}
              ref={(element) => { optionRefs.current[index] = element; }}
              onMouseDown={(event) => event.preventDefault()}
              onPointerMove={(event) => { if (event.pointerType === "mouse") setActiveIndex(index); }}
              onClick={() => {
                choose(index);
                triggerRef.current?.focus({ preventScroll: true });
              }}
            >
              <span>{option}</span>
              {value === option ? <span aria-hidden="true">✓</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
