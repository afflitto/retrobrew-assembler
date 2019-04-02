class LDA {

  microstep({step, emulator}){
    if(step === 2){
      emulator.ir.out();
      emulator.mar.in();
    } else if(step === 3) {
      emulator.memory.out();
      emulator.regA.in();
    }
  }
}

export { LDA };
