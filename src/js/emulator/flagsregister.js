class FlagsRegister {
  constructor() {
    this._value = 0;

    console.log('Set up flags register!');
  }

  set zero(isEqualZero) {
    if(isEqualZero) {
      this._value = this._value | 0b00000001;
    } else {
      this._value = this._value & 0b11111110;
    }
  }
  set carry(isCarry) {
    if(isCarry) {
      this._value = this._value | 0b00000010;
    } else {
      this._value = this._value & 0b11111101;
    }
  }
  get zero() {
    return ( this._value & 0b00000001 ) === 0b00000001;
  }
  get carry() {
    return ( this._value & 0b00000010 ) === 0b00000010;
  }

  clear() {
    this._value = 0;
  }
}

export { FlagsRegister };
