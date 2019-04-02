class STA {

  microstep({step, emulator}){
    if(step === 2){
      emulator.ir.out();
      emulator.mar.in();
    } else if(step === 3) {
      emulator.regA.out();
      emulator.memory.in();
    }
  }
}

export { STA };
