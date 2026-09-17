import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    items: [
      { id: "one", label: "Overview", content: "Overview content" },
      { id: "two", label: "Activity", content: "Activity content" },
      { id: "three", label: "Disabled", disabled: true, content: "No access" },
    ],
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
