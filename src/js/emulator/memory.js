class Memory {
  constructor({ size = 16, mar, bus}) {
    this.memory = new Array(size).fill(0);
    this.mar = mar;
    this.bus = bus;

    this.memory = [
      0b00011111, //LDA x
      0b11100000, //OUT
      0b00101110, //ADD i
      0b11100000, //OUT
      0b01100010, //JMP 0010
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000000,
      0b00000001, //int i
      99          //int x
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
