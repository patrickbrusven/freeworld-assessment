import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import App from "./App";
import useBestCombination from "./useBestCombination";
import testData from "./testData";

test("renders learn react link", () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

describe("useBestCombination", () => {
  test("useBestCombination should return max earnings of 12300", () => {
    const { result } = renderHook(() => useBestCombination(testData, 20));

    expect(result.current.possibleEarnings).toBe(12300);
  });
});
