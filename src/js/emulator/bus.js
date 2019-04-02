class Bus {
  constructor({ bits = 8 }) {
    this._value = 'Z';
    this.mask = Math.pow(2, bits) - 1;
  }

  get value() {
    return this._value;
  }
  set value(newValue) {
    if(newValue === 'Z') {
      this._value = 'Z';
    } else {
      if(this._value === 'Z') {
        this._value = newValue & this.mask;
      } else {
        throw `Weak unknown - tried to drive bus from ${this._value} to ${newValue}!`;
      }
    }
  }
}

export { Bus };
