import { Clock } from './clock.js';
import { Memory } from './memory.js';
import { Register } from './register.js';
import { Bus } from './bus.js';

class Emulator {

  constructor() {
    this.clock = new Clock({frequency: 1, tick: this.tick}); //1Hz clock
    this.clock.start();

    this.bus = new Bus({bits: 8});

    this.regA = new Register({bus: this.bus, bits: 8});
    this.regB = new Register({bus: this.bus, bits: 8});
    this.mar = new Register({bus: this.bus, bits: 8});
    this.mdr = new Register({bus: this.bus, bits: 8});
    this.regOut = new Register({bus: this.bus, bits: 8});
    this.pc = new Register({bus: this.bus, bits: 4});
    this.memory = new Memory({mar: this.mar, bus: this.bus});
  }

  tick() {
    //test printing from memory
    let self = window.emulator;

    self.pc.out();
    self.mar.in();

    self.bus.value = 'Z';

    self.memory.out();
    self.regOut.in();
    console.log(`PC: ${self.pc.value} OUT: ${self.regOut.value}`)

    self.bus.value = 'Z';

    self.pc.value = self.pc.value + 1;
  }
}

export { Emulator }
