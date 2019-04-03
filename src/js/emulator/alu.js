class ALU {
  constructor({ bus, regA, regB, flags }) {
    this.bus = bus;
    this.regA = regA;
    this.regB = regB;
    this.flags = flags;

    this.mask = Math.pow(2, 8) - 1; //mask for zero flag
  }

  outAdd() {
    let sum = this.regA.value + this.regB.value;
    if((sum & this.mask) === 0) {
      this.flags.zero = true;
    } else {
      this.flags.zero = false;
    }
    if(sum > 255) {
      this.flags.carry = true;
    } else {
      this.flags.carry = false;
    }

    this.bus.value = sum;
  }

  outSub() {
    let sum = this.regA.value - this.regB.value;
    if((sum & this.mask) === 0) {
      this.flags.zero = true;
    } else {
      this.flags.zero = false;
    }
    if(sum >= 0) {
      this.flags.carry = true;
    } else {
      this.flags.carry = false;
    }

    this.bus.value = sum;
  }
}

export { ALU };
