import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import { ToastRegion, type ToastMessage } from "./Toast";
const Demo = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  return (
    <>
      <Button
        onClick={() =>
          setMessages([
            {
              id: Date.now(),
              kind: "success",
              title: "Changes saved",
              description: "Your preferences are up to date.",
            },
          ])
        }
      >
        Show toast
      </Button>
      <ToastRegion
        messages={messages}
        onDismiss={(id) =>
          setMessages((items) => items.filter((item) => item.id !== id))
        }
      />
    </>
  );
};
const meta = {
  title: "Components/Toast",
  component: Demo,
  tags: ["autodocs"],
} satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Success: Story = {};
