import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";
import { FormWrapperLogin } from "./FormWrapper.login";

describe("FormWrapperLogin", () => {
  it("renders a section element", () => {
    const { container } = render(<FormWrapperLogin />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
  });

  it("applies correct styles", () => {
    const { container } = render(<FormWrapperLogin />);
    const section = container.querySelector("section");
    expect(section).toHaveStyle({
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    });
  });
});

// We recommend installing an extension to run vitest tests.
