import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandMenu } from "./CommandMenu";
it("filters and selects a command from the keyboard", async () => {
  const user = userEvent.setup();
  const chosen = vi.fn();
  render(
    <CommandMenu
      items={[
        {
          id: "appearance",
          label: "Change appearance",
          hint: "Theme",
          action: chosen,
        },
        {
          id: "invite",
          label: "Invite people",
          hint: "Members",
          action: vi.fn(),
        },
      ]}
    />,
  );
  await user.click(screen.getByRole("button", { name: /command menu/i }));
  const input = screen.getByRole("textbox", { name: "Search commands" });
  await user.type(input, "appearance");
  expect(screen.queryByText("Invite people")).not.toBeInTheDocument();
  await user.keyboard("{Enter}");
  expect(chosen).toHaveBeenCalledTimes(1);
});
