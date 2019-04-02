class ALU {
  constructor({ bus, regA, regB }) {
    this.bus = bus;
    this.regA = regA;
    this.regB = regB;
  }

  outAdd() {
    this.bus.value = this.regA.value + this.regB.value;
  }

  outSub() {
    this.bus.value = this.regA.value - this.regB.value;
  }
}

export { ALU };
