class JC {

  microstep({step, emulator}){
    if(step === 2 && emulator.flags.carry){
      emulator.ir.out();
      emulator.pc.in();
    }
  }
}

export { JC };
