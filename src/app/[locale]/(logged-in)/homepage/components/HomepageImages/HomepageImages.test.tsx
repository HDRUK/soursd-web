import React from "react";
import { render } from "@testing-library/react";
import HomepageImages from "./HomepageImages";

// Mock the next/image module
jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

// Mock the styled component
jest.mock("./HomepageImages.styles", () => ({
  StyledContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="styled-container">{children}</div>
  ),
}));

describe("HomepageImages Component", () => {
  it("renders the images correctly", () => {
    const { getByAltText, getByTestId } = render(<HomepageImages />);

    // Check if the StyledContainer is rendered
    const container = getByTestId("styled-container");
    expect(container).toBeInTheDocument();

    // Check if the images are rendered with correct alt attributes
    const image1 = getByAltText("image_1");
    expect(image1).toBeInTheDocument();

    const image2 = getByAltText("image_2");
    expect(image2).toBeInTheDocument();

    const image3 = getByAltText("image_3");
    expect(image3).toBeInTheDocument();
  });
});
