class Location {
  #id;
  #city;
  #state;
  // Only one location will ever be open at a time. This location is tracked to ensure that
  // it will be reopened when the user revisits the website, and that it will be highlighted
  // in the sidebar.
  #isOpen;

  constructor(city, state, isOpen) {
    this.#id = crypto.randomUUID();
    this.#city = city;
    this.#state = state;
    this.#isOpen = isOpen;
  }

  get id() {
    return this.#id;
  }

  get city() {
    return this.#city;
  }

  get state() {
    return this.#state;
  }

  get isOpen() {
    return this.#isOpen;
  }

  set isOpen(value) {
    this.#isOpen = value;
  }

  toJSON() {
    return JSON.stringify({
      city: this.#city,
      state: this.#state,
      isOpen: this.#isOpen,
    });
  }
}

export { Location };
