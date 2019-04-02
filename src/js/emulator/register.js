class Register {
  constructor({ bus, bits }) {
    this._value = 0;
    this.bus = bus;
    this.mask = Math.pow(2, bits) - 1;

    console.log('Set up register!');
  }

  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue & this.mask;
  }

  in() {
    this.value = this.bus.value;
  }

  out() {
    this.bus.value = this.value;
  }

  clear() {
    this.value = 0;
  }
}

export { Register };
