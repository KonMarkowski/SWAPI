import { SearchInterface } from "./search-interface";
import { render, screen } from "@testing-library/react";

describe("Search interface", () => {
  test("check if force button exist", () => {
    render(<SearchInterface />);

    const useForceButton = screen.getByText(
      "use the force to find what you are looking for"
    );

    expect(useForceButton).toBeTruthy();
  });

  test("should find exactly one input", () => {
    render(<SearchInterface />);

    const input = screen.getAllByPlaceholderText(
      "Type character full name, Homeworld name or Homeworld population"
    );

    expect(input).toHaveLength(1);
  });

  test("header with given text does not exist", () => {
    render(<SearchInterface />);

    const header = screen.queryByText("Find Star Wars characterz");

    expect(header).not.toBeTruthy();
  });
});
