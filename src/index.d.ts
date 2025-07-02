interface CustomMatchers<R = unknown> {
  toBeControlledBy: (trigger: HTMLElement) => R;
}

declare namespace jest {
  interface Expect extends CustomMatchers {}
  interface Matchers<R> extends CustomMatchers<R> {}
}

declare global {
  function mockUseStore(config?: Partial<StoreState>): void;
  function clearInputsByLabelText(selectors: (string | RegExp)[]): void;
  function clearInput(element: HTMLElement): void;
  function changeSelectValueByLabelText(
    selector: string | RegExp,
    value: string
  ): void;
}

declare function mockUseStore(config?: Partial<StoreState>): string;
declare function clearInputsByLabelText(selectors: (string | RegExp)[]): void;
declare function clearInput(element: HTMLElement): void;
declare function changeSelectValueByLabelText(
  selector: string | RegExp,
  value: string
): void;
