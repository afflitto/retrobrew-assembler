class JEZ {

  microstep({step, emulator}){
    if(step === 2 && emulator.flags.zero){
      emulator.ir.out();
      emulator.pc.in();
    }
  }
}

export { JEZ };
