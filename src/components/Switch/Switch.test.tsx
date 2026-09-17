import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Switch } from "./Switch";
const Demo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch label="Alerts" checked={checked} onCheckedChange={setChecked} />
  );
};
it("toggles with keyboard", async () => {
  const user = userEvent.setup();
  render(<Demo />);
  const control = screen.getByRole("switch", { name: "Alerts" });
  await user.tab();
  await user.keyboard(" ");
  expect(control).toHaveAttribute("aria-checked", "true");
});
