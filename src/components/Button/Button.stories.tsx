import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Create project" },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["primary", "secondary", "ghost", "destructive"] as const).map(
        (variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ),
      )}
    </div>
  ),
};
export const Loading: Story = {
  args: { loading: true, children: "Saving changes" },
};
export const IconButtons: Story = {
  render: () => (
    <>
      <Button iconOnly aria-label="Add">
        <Plus size={17} />
      </Button>{" "}
      <Button iconOnly variant="destructive" aria-label="Delete">
        <Trash2 size={17} />
      </Button>
    </>
  ),
};
