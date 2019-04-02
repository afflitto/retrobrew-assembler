class JMP {

  microstep({step, emulator}){
    if(step === 2){
      emulator.ir.out();
      emulator.pc.in();
    }
  }
}

export { JMP };
