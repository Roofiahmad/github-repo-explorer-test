import { countFormatter } from ".";

test("test counterFormatter function", () => {
  expect(countFormatter(12001)).toBe("12.0K");
  expect(countFormatter(12341000)).toBe("12.3M");
  expect(countFormatter(89)).toBe("89");
});
