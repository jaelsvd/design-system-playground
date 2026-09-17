import type { Meta, StoryObj } from "@storybook/react";
import { CommandMenu } from "./CommandMenu";
const meta = {
  title: "Patterns/Command Menu",
  component: CommandMenu,
  tags: ["autodocs"],
  args: {
    items: [
      {
        id: "theme",
        label: "Change appearance",
        hint: "Choose light or dark mode",
        action: () => {},
      },
      {
        id: "invite",
        label: "Invite collaborator",
        hint: "Add someone to the workspace",
        action: () => {},
      },
    ],
  },
} satisfies Meta<typeof CommandMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
