class ADD {

  microstep({step, emulator}){
    if(step === 2){
      emulator.ir.out();
      emulator.mar.in();
    } else if(step === 3) {
      emulator.memory.out();
      emulator.regB.in();
    } else if(step === 4) {
      emulator.alu.outAdd();
      emulator.regA.in();
    }
  }
}

export { ADD };
