class Memory {
  constructor({ size = 16, mar, bus}) {
    this.memory = new Array(size).fill(0);
    this.mar = mar;
    this.bus = bus;

    this.memory = [
      0b01010001,
      0b11100000,
      0b01010011,
      0b11100000,
      0b01010111,
      0b11100000,
      0b01011111,
      0b11100000,
      0b01010111,
      0b11100000,
      0b01010011,
      0b11100000,
      0b01010001,
      0b11100000,
      0b01010000,
      0b11100000
    ];

    console.log('Set up memory!');
  }

  in() {
    this.memory[this.mar.value] = this.bus.value;
  }

  out() {
    this.bus.value = this.memory[this.mar.value];
  }

  save(addr, value) {
    if(value >= 0 && value <= 255) {
      this.memory[addr] = value;
    } else {
      throw "Value out of bounds!"
    }
  }

  clear() {
    this.memory.forEach(value => value = 0);
  }
}

export { Memory };
