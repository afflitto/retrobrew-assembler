class InstructionRegister {
  constructor({ bus, bits = 8}) {
    this._value = 0;
    this.bus = bus;
    this.mask = Math.pow(2, bits) - 1;

    console.log('Set up instruction register!');
  }

  set value(newValue) {
    this._value = newValue & this.mask;
  }
  get instruction() {
    return this._value >> 4;
  }
  get data() {
    return this._value & 0b00001111;
  }

  in() {
    this.value = this.bus.value;
  }

  out() {
    this.bus.value = this.data;
  }

  clear() {
    this.value = 0;
  }
}

export { InstructionRegister };
