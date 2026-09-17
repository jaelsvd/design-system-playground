import { useId, useState, type ReactNode } from "react";
import styles from "./Tabs.module.scss";
export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  content: ReactNode;
}
export function Tabs({
  items,
  defaultValue,
}: {
  items: TabItem[];
  defaultValue?: string;
}) {
  const [active, setActive] = useState(
    defaultValue ?? items.find((i) => !i.disabled)?.id ?? "",
  );
  const baseId = useId();
  const activeIndex = items.findIndex((i) => i.id === active);
  const move = (direction: 1 | -1) => {
    let next = activeIndex;
    do {
      next = (next + direction + items.length) % items.length;
    } while (items[next].disabled && next !== activeIndex);
    setActive(items[next].id);
    document.getElementById(`${baseId}-${items[next].id}`)?.focus();
  };
  return (
    <div className={styles.tabs}>
      <div role="tablist" aria-label="Sections" className={styles.list}>
        {items.map((item) => (
          <button
            key={item.id}
            id={`${baseId}-${item.id}`}
            role="tab"
            aria-selected={active === item.id}
            aria-controls={`${baseId}-${item.id}-panel`}
            disabled={item.disabled}
            tabIndex={active === item.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(item.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                move(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(-1);
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map(
        (item) =>
          active === item.id && (
            <div
              key={item.id}
              className={styles.panel}
              role="tabpanel"
              id={`${baseId}-${item.id}-panel`}
              aria-labelledby={`${baseId}-${item.id}`}
            >
              {item.content}
            </div>
          ),
      )}
    </div>
  );
}
