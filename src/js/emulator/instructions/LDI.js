class LDI {

  microstep({step, emulator}){
    if(step === 2){
      emulator.ir.out();
      emulator.regA.in();
    }
  }
}

export { LDI };
