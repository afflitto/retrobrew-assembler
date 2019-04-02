class Memory {
  constructor({ size = 16, mar, bus}) {
    this.memory = new Array(size).fill(0);
    this.mar = mar;
    this.bus = bus;

    this.memory = [
      0b00011111, //LDA x
      0b11100000, //OUT
      0b11110000, //HLT
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      99          //uint8_t x
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
