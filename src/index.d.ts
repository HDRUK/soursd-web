declare namespace jest {
  interface Expect {
    toBeControlledBy: (area: HTMLElement, trigger: HTMLElement) => boolean;
  }
}
