import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { TextInput } from "./TextInput";
const meta = {
  title: "Components/Text Input",
  component: TextInput,
  tags: ["autodocs"],
  args: { label: "Project name", placeholder: "A thoughtful name" },
} satisfies Meta<typeof TextInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const HelperText: Story = {
  args: { helperText: "Visible to everyone in the workspace." },
};
export const Error: Story = {
  args: {
    defaultValue: "x",
    error: "Project names must contain at least 3 characters.",
  },
};
export const Success: Story = {
  args: { defaultValue: "Interface", success: "This name is available." },
};
export const WithIcons: Story = { args: { leadingIcon: <Search size={16} /> } };
