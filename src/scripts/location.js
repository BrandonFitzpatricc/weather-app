class Location {
  #id;
  #city;
  #state;
  #isBeingViewed;

  constructor(city, state, isBeingViewed) {
    this.#id = crypto.randomUUID();
    this.#city = city;
    this.#state = state;
    this.#isBeingViewed = isBeingViewed;
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

  get isBeingViewed() {
    return this.#isBeingViewed;
  }

  set isBeingViewed(value) {
    this.#isBeingViewed = value;
  }

  toJSON() {
    return JSON.stringify({
      city: this.#city,
      state: this.#state,
      isBeingViewed: this.#isBeingViewed,
    });
  }
}

export { Location };
