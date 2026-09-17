import { Command, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import styles from "./CommandMenu.module.scss";
export interface CommandItem {
  id: string;
  label: string;
  hint: string;
  action: () => void;
}
export function CommandMenu({ items }: { items: CommandItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const filtered = useMemo(
    () =>
      items.filter((item) =>
        `${item.label} ${item.hint}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [items, query],
  );
  useEffect(() => {
    const openOnShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", openOnShortcut);
    return () => window.removeEventListener("keydown", openOnShortcut);
  }, []);
  useEffect(() => setActive(0), [query]);
  const choose = (item: CommandItem) => {
    item.action();
    setOpen(false);
    setQuery("");
  };
  const highlight = (value: string) => {
    const index = value.toLowerCase().indexOf(query.toLowerCase());
    if (!query || index < 0) return value;
    return (
      <>
        {value.slice(0, index)}
        <mark>{value.slice(index, index + query.length)}</mark>
        {value.slice(index + query.length)}
      </>
    );
  };
  return (
    <>
      <Button
        variant="secondary"
        className={styles.trigger}
        onClick={() => setOpen(true)}
      >
        <span>
          <Command size={15} aria-hidden="true" /> Command menu
        </span>
        <kbd className={styles.kbd}>⌘ K</kbd>
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Go to…"
        description="Search preferences and workspace actions."
      >
        <input
          autoFocus
          className={styles.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search commands"
          aria-label="Search commands"
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive(Math.min(active + 1, filtered.length - 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive(Math.max(active - 1, 0));
            }
            if (event.key === "Enter" && filtered[active])
              choose(filtered[active]);
          }}
        />
        <div className={styles.list} role="listbox" aria-label="Commands">
          {filtered.length ? (
            filtered.map((item, index) => (
              <button
                key={item.id}
                role="option"
                aria-selected={index === active}
                data-active={index === active}
                className={styles.item}
                onMouseMove={() => setActive(index)}
                onClick={() => choose(item)}
              >
                <Search size={16} aria-hidden="true" />
                <span>
                  {highlight(item.label)}
                  <small
                    style={{
                      color: "var(--color-text-muted)",
                      display: "block",
                      marginTop: 2,
                    }}
                  >
                    {item.hint}
                  </small>
                </span>
              </button>
            ))
          ) : (
            <div className={styles.empty}>No commands found for “{query}”.</div>
          )}
        </div>
      </Dialog>
    </>
  );
}
