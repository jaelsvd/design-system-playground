import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactElement } from "react";
export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) {
  return (
    <RadixTooltip.Provider delayDuration={250}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={8}
            style={{
              background: "var(--color-text)",
              borderRadius: "6px",
              color: "var(--color-surface)",
              fontSize: "var(--text-xs)",
              padding: "6px 8px",
              zIndex: "var(--z-toast)",
            }}
          >
            {label}
            <RadixTooltip.Arrow fill="var(--color-text)" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
