import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dialog } from "./Dialog";
import { Button } from "../Button";
const Example = ({ destructive = false }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={destructive ? "destructive" : "primary"}
        onClick={() => setOpen(true)}
      >
        {destructive ? "Delete workspace" : "Open dialog"}
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={destructive ? "Delete workspace?" : "Invite collaborator"}
        description={
          destructive
            ? "This action is permanent."
            : "Invite someone to collaborate."
        }
        footer={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        <p>Dialog body content is announced and focus is safely contained.</p>
      </Dialog>
    </>
  );
};
const meta = {
  title: "Components/Dialog",
  component: Example,
  tags: ["autodocs"],
} satisfies Meta<typeof Example>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
export const DestructiveConfirmation: Story = { args: { destructive: true } };
