import { Clock } from './clock.js';
import { Memory } from './memory.js';
import { Register } from './register.js';
import { InstructionRegister } from './instructionregister.js';
import { Bus } from './bus.js';
import { Instructions } from './instructions/instructions.js';
import { ALU } from './alu.js';
import { FlagsRegister } from './flagsregister.js';

class Emulator {

  constructor({ uiTick, debug = false }) {
    this.uiTick = uiTick;
    this.debug = debug;

    this.clock = new Clock({frequency: 10, tick: this.tick}); //1Hz clock
    //this.clock.start();

    this.bus    = new Bus({bits: 8});

    this.regA   = new Register({bus: this.bus, bits: 8});
    this.regB   = new Register({bus: this.bus, bits: 8});
    this.mar    = new Register({bus: this.bus, bits: 4});
    this.regOut = new Register({bus: this.bus, bits: 8});
    this.pc     = new Register({bus: this.bus, bits: 4});
    this.ir     = new InstructionRegister({bus: this.bus, bits: 8});

    this.flags  = new FlagsRegister();
    this.alu    = new ALU({bus: this.bus, regA: this.regA, regB: this.regB, flags: this.flags });

    this.memory = new Memory({mar: this.mar, bus: this.bus});

    this.instructions = Instructions;
    this.microstep = 0;
  }

  tick() {
    let self = window.emulator;

    //test printing from memory
    if(self.microstep === 0) {
      self.pc.out();
      self.mar.in();
    } else if(self.microstep === 1){
      self.memory.out();
      self.ir.in();
      self.pc.value = self.pc.value + 1;
    } else {
      const instruction = self.instructions[self.ir.instruction];
      if(instruction) {
        instruction.microstep({step: self.microstep, emulator: self});
      }
    }

    self.microstep++;
    if(self.microstep > 5) {
      self.microstep = 0;
    }
    self.bus.value = 'Z';

    if(self.debug) {
      console.log(`STEP: ${self.microstep} PC: ${self.pc.value} IR: ${self.ir.instruction} CARRY: ${self.flags.carry} ZERO: ${self.flags.zero}`)
    }

    self.uiTick();
  }

  reset() {
    this.regA.clear();
    this.regB.clear();
    this.mar.clear();
    this.pc.clear();
    this.ir.clear();
    this.flags.clear();
  }
}

export { Emulator }
