class Memory {
  constructor({ size = 16, mar, bus}) {
    this.memory = new Array(size).fill(0);
    this.mar = mar;
    this.bus = bus;

    // 0b0000: new NOP(),
    // 0b0001: new LDA(),
    // 0b0010: new ADD(),
    // 0b0011: new SUB(),
    // 0b0100: new STA(),
    // 0b0101: new LDI(),
    // 0b0110: new JMP(),
    // 0b0111: new JEZ(),
    // 0b1000: new JGZ(),
    // 0b1110: new OUT(),
    // 0b1111: new HLT()

    this.memory = [
      0b00011111, //DEC:  LDA x
      0b00111110, //      SUB i
      0b01001111, //      STA x
      0b11100000, //      OUT
      0b01110110, //      JEZ INC
      0b01100000, //      JMP DEC
      0b00011111, //INC:  LDA x
      0b00101110, //      ADD i
      0b01001111, //      STA x
      0b11100000, //      OUT
      0b01110000, //      JEZ DEC
      0b01100110, //      JMP INC
      0b00000000,
      0b00000000,
      0b00000001, //i:
      0b00001111  //x:
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
