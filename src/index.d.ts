interface CustomMatchers<R = unknown> {
  toBeControlledBy: (trigger: HTMLElement) => R;
}

declare namespace jest {
  interface Expect extends CustomMatchers {}
  interface Matchers<R> extends CustomMatchers<R> {}
}
