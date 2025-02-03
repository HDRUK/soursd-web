interface CustomMatchers<R = unknown> {
  toBeControlledBy: (trigger: HTMLElement) => R;
}

declare namespace jest {
  interface Expect extends CustomMatchers {}
  interface Matchers<R> extends CustomMatchers<R> {}
}

declare global {
  function mockUseStore(config?: Partial<StoreState>): void;
}

declare function mockUseStore(config?: Partial<StoreState>): string;

// declare var signup(id?: string): string[];

// declare var mockUseStore(state?: Partial<StoreState>): void;
