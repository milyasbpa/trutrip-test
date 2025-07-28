import { render, screen } from "@testing-library/react";
import { BannerLogin } from "./Banner.login";
import { vi, describe, it, expect } from "vitest";

// Mock data
vi.mock("@/features/public/login/data/static.json", () => ({
  default: {
    banner: {
      image: {
        src: "/test-image.png",
        alt: "Test Alt",
        width: 300,
        height: 200,
      },
      title: "features.public.login.data.static.json:banner.title",
      description: "features.public.login.data.static.json:banner.description",
    },
  },
}));

// Mock useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "features.public.login.data.static.json:banner.title": "Welcome Back",
        "features.public.login.data.static.json:banner.description":
          "Please login to continue",
      };
      return translations[key] || key;
    },
  }),
}));

describe("BannerLogin", () => {
  it("should render banner image and translated text", () => {
    render(<BannerLogin />);

    // Check image
    const img = screen.getByRole("img", { name: "Test Alt" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-image.png");

    // Check translated texts
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByText("Please login to continue")).toBeInTheDocument();
  });
});
