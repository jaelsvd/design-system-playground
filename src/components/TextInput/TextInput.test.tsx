import { render, screen } from "@testing-library/react";
import { TextInput } from "./TextInput";
it("connects input errors to the input", () => {
  render(<TextInput label="Email" error="Enter a valid email" />);
  const input = screen.getByLabelText("Email");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAccessibleDescription("Enter a valid email");
});
