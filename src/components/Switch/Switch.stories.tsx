import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./Switch";
const Demo = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      checked={checked}
      onCheckedChange={setChecked}
      label="Weekly digest"
      description="A concise summary each Monday."
    />
  );
};
const meta = {
  title: "Components/Switch",
  component: Demo,
  tags: ["autodocs"],
} satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = {
  render: () => (
    <Switch
      checked
      onCheckedChange={() => {}}
      disabled
      label="Managed setting"
      description="This setting is controlled by your organization."
    />
  ),
};
